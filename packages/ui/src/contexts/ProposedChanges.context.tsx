/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useToast } from '@/hooks';
import { Line } from '@carrismetropolitana/api-types/network';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, Facilities, facilitiesSchema, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR, { mutate } from 'swr';

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

	const approve = async <S extends ScopeKey>(id: string, field: keyof ScopeEntityMap[S] | string, relatedId: string, value: unknown) => {
		try {
			const normalizedField = String(field).startsWith('near_') ? String(field).replace(/^near_/, '') : String(field);
			const entityEndpoints: Record<ScopeKey, string> = {
				line: 'lines',
				stop: 'stops',
			};
			const app = entityEndpoints[scope];
			const entityResponse = await fetchData(`${getAppConfig(app, 'api_url')}/${app}/${relatedId}`, 'GET');
			const entity = entityResponse.data as ScopeEntityMap[S];
			const updateBody: Record<string, unknown> = {};
			if (scope === 'stop' && normalizedField === 'facilities' && Array.isArray(entity['facilities'])) {
				const currentArray = entity['facilities'] as Facilities[];
				const typedValue = value as Facilities;
				const exists = currentArray.includes(typedValue);
				updateBody['facilities'] = exists ? currentArray.filter(item => item !== typedValue) : [...currentArray, typedValue];
			}
			else if (
				scope === 'stop'
				&& facilitiesSchema.options.includes(normalizedField as Facilities)
				&& Array.isArray(entity['facilities'])
			) {
				const currentArray = entity['facilities'] as Facilities[];
				const stringValue = normalizedField as Facilities;
				const exists = currentArray.includes(stringValue);
				updateBody['facilities'] = exists
					? currentArray.filter(item => item !== stringValue)
					: [...currentArray, stringValue];
			}
			else if (normalizedField in entity) {
				updateBody[normalizedField] = value;
			}
			// Optimistic update for proposed changes list
			const updated = [...proposedChangesData || []]?.map(change => change._id === id ? { ...change, status: 'approved' } : change);
			await mutate(proposedChangesData, updated, false);
			await fetchData(`${getAppConfig(app, 'api_url')}/${app}/${relatedId}`, 'PUT', updateBody);
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'approved' });
			useToast.success({ message: 'Proposta aprovada com sucesso', title: 'Sucesso' });
			await mutate(proposedChangesData);
		}
		catch (error) {
			console.error('Error approving proposed change:', error);
			useToast.error({ message: 'Erro ao aprovar proposta', title: 'Erro' });
			await mutate(proposedChangesData);
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'pending' });
		}
	};

	const reject = async (id: string) => {
		const updated = [...proposedChangesData || []]?.map(change => change._id === id ? { ...change, status: 'rejected' } : change);
		try {
			await mutate(proposedChangesData, updated, false);
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'rejected' });
			useToast.success({ message: 'Proposta rejeitada com sucesso', title: 'Sucesso' });
			await mutate(proposedChangesData);
		}
		catch (error) {
			console.error('Error rejecting proposed change:', error);
			useToast.error({ message: 'Erro ao reprovar proposta', title: 'Erro' });
			await mutate(proposedChangesData);
		}
	};

	const submit = async (data: CreateProposedChangeDto<Entity>) => {
		try {
			const optimistic = [...proposedChangesData || [], { ...data, status: 'pending' }];
			await mutate(optimistic, false);
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes`, 'POST', data);
			useToast.success({ message: 'Proposta submetida com sucesso', title: 'Sucesso' });
			await mutate(proposedChangesData);
		}
		catch (error) {
			console.error('Error submitting proposed change:', error);
			useToast.error({ message: 'Erro ao submeter proposta', title: 'Erro' });
			await mutate(proposedChangesData);
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
