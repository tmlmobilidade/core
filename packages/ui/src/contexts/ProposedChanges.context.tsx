/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Line } from '@carrismetropolitana/api-types/network';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface ScopeEntityMap {
	line: Line
	stop: Stop
}

type ScopeKey = keyof ScopeEntityMap;

interface ProposedChangesContextState<T> {
	actions: {
		approve: (id: string) => Promise<void>
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

export function useProposedChangesContext<T>() {
	const context = useContext(ProposedChangesContext);
	if (!context) throw new Error('useProposedChangesContext must be used within a ProposedChangesContextProvider');
	return context as ProposedChangesContextState<T>;
}

/* * */

export function ProposedChangesContextProvider<S extends ScopeKey>({
	children,
	scope,
	stopId,
}: PropsWithChildren<{ scope: S, stopId?: string }>) {
	type Entity = ScopeEntityMap[S];

	//
	// A. Setup variables
	const [relatedProposedChanges, setRelatedProposedChanges] = useState<ProposedChange<Entity>[]>([]);

	//
	// B. Fetch data
	const { data: proposedChangesData, error: proposedChangesError, isLoading: proposedChangesLoading } = useSWR<ProposedChange<Entity>[], HttpException>(`${getAppConfig('auth', 'api_url')}/proposed-changes?scope=${scope}`, { refreshInterval: 2000 });

	//
	// C. Filter by related ID
	useEffect(() => {
		if (!proposedChangesData || proposedChangesError || !stopId) return;
		const filtered = proposedChangesData.filter(change => change.related_id === stopId);
		setRelatedProposedChanges(filtered ?? []);
	}, [proposedChangesData, stopId, proposedChangesError, proposedChangesLoading]);

	//
	// D. Handle actions
	const approve = async (id: string) => {
		try {
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`, 'PUT', { status: 'approved' });
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
