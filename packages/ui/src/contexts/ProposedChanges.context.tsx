/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Line } from '@carrismetropolitana/api-types/network';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

export interface ScopeEntityMap {
	line: Line
	stop: Stop
}

export type ScopeKey = keyof ScopeEntityMap;

interface ProposedChangesContextState<T> {
	actions: {
		approve: (id: string, field: string, relatedId: string, value: unknown) => Promise<void>
		reject: (id: string) => Promise<void>
		submit: (data: CreateProposedChangeDto<T>) => Promise<void>
	}
	data: {
		allProposedChanges: ProposedChange<T>[]
		allProposedChangesByRelatedId: ProposedChange<T>[]
	}
	flags: {
		error?: HttpException
		loading: boolean
	}
}

/* * */

const ProposedChangesContext = createContext<ProposedChangesContextState<any> | undefined>(undefined);

export function useProposedChangesContext<S extends ScopeKey>(scope: S): ProposedChangesContextState<ScopeEntityMap[S]> {
	const context = useContext(ProposedChangesContext);
	if (!context) {
		throw new Error('useProposedChangesContext must be used within a ProposedChangesContextProvider');
	}
	return context as ProposedChangesContextState<ScopeEntityMap[S]>;
}

/* * */

export function ProposedChangesContextProvider<S extends ScopeKey>({ children, relatedId, scope }: PropsWithChildren<{ relatedId?: string, scope: S }>) {
	type Entity = ScopeEntityMap[S];

	//
	// A. Setup variables

	const [relatedProposedChanges, setRelatedProposedChanges] = useState<ProposedChange<Entity>[]>([]);
	const { data: proposedChangesData, error: proposedChangesError, isLoading: proposedChangesLoading } = useSWR<ProposedChange<Entity>[], HttpException>(`${getAppConfig('auth', 'api_url')}/proposed-changes?scope=${scope}`, { refreshInterval: 2000 });

	//
	// B. Transform data

	useEffect(() => {
		if (!proposedChangesData || proposedChangesError || !relatedId) return;
		const filtered = proposedChangesData.filter(change => change.related_id === relatedId);
		setRelatedProposedChanges(filtered ?? []);
	}, [proposedChangesData, relatedId, proposedChangesError, proposedChangesLoading]);

	//
	// C. Handle actions

	// C. Handle actions
	const approve = async <S extends ScopeKey>(
		id: string,
		field: keyof ScopeEntityMap[S] | string,
		relatedId: string,
		value: unknown,
	) => {
		try {
			console.log('Approving proposed change:', { field, id, relatedId, value });
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'approved' });
			console.log(`Proposed change ${id} approved`);
			const normalizedField = String(field).startsWith('near_') ? String(field).replace(/^near_/, '') : String(field);

			if (scope === 'stop') {
				const stopResponse = await fetchData(`${getAppConfig('stops', 'api_url')}/stops/${relatedId}`, 'GET');
				const stop = stopResponse.data as Stop;
				console.log('Current stop data:', stop);
				const updateBody: Record<string, unknown> = {};
				const arrayField: keyof Stop = 'facilities';
				const validFacilityValues: Stop['facilities'] = ['school', 'fire_station', 'health_clinic', 'historic_building', 'hospital', 'police_station', 'shopping', 'transit_office', 'university', 'beach'];

				// Case 1: direct array update
				if (normalizedField === arrayField && Array.isArray(stop[arrayField])) {
					const currentArray = stop[arrayField] as Stop['facilities'];
					const typedValue = value as Stop['facilities'][number];
					const exists = currentArray.includes(typedValue);

					updateBody[arrayField] = exists ? currentArray.filter(item => item !== typedValue) : [...currentArray, typedValue];

					console.log('Updating array field:', arrayField, updateBody[arrayField]);
				}

				// Case 2: normalizedField represents a facility item
				else if (
					validFacilityValues.includes(normalizedField as Stop['facilities'][number]) && Array.isArray(stop[arrayField])
				) {
					const currentArray = stop[arrayField] as Stop['facilities'];
					const stringValue = normalizedField as Stop['facilities'][number];
					const exists = currentArray.includes(stringValue);

					updateBody[arrayField] = exists ? currentArray.filter(item => item !== stringValue) : [...currentArray, stringValue];

					console.log('Updating facility item in array:', stringValue, updateBody[arrayField]);
				}

				// Case 3: normal field update (any value allowed)
				else if (normalizedField in stop) {
					updateBody[normalizedField] = value;
					console.log('Updating normal field:', normalizedField, value);
				}

				console.log('Final update payload:', updateBody);
				await fetchData(`${getAppConfig('stops', 'api_url')}/stops/${relatedId}`, 'PUT', updateBody);
			}
		}
		catch (error) {
			console.error('Error approving proposed change:', error);
		}
	};

	const reject = async (id: string) => {
		try {
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'rejected' });
		}
		catch (error) {
			console.error('Error rejecting proposed change:', error);
		}
	};

	const submit = async (data: CreateProposedChangeDto<Entity>) => {
		try {
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes`, 'POST', data);
		}
		catch (error) {
			console.error('Error submitting proposed change:', error);
		}
	};

	//
	// E. Define context value
	const contextValue: ProposedChangesContextState<Entity> = useMemo(() => ({
		actions: { approve, reject, submit },
		data: {
			allProposedChanges: proposedChangesData ?? [],
			allProposedChangesByRelatedId: relatedProposedChanges ?? [],
		},
		flags: {
			error: proposedChangesError,
			loading: proposedChangesLoading,
		},
	}),
	[proposedChangesData, proposedChangesError, proposedChangesLoading, relatedProposedChanges],
	);

	//
	// F. Render Components

	return <ProposedChangesContext.Provider value={contextValue}>{children}</ProposedChangesContext.Provider>;
}
