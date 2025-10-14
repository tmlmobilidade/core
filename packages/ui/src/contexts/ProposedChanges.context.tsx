'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface ProposedChangesContextState {
	actions: {
		approve: (id: string) => Promise<void>
		reject: (id: string) => Promise<void>
		submit: (data: CreateProposedChangeDto<Stop>) => Promise<void>
	}
	data: {
		allProposedChangesStops: ProposedChange<Stop>[]
		allProposedChangesStopsByRelatedId: ProposedChange<Stop>[]
	}
	flags: {
		error?: HttpException
		loading: boolean
	}
}

/* * */

const ProposedChangesContext = createContext<ProposedChangesContextState | undefined>(undefined);

export function useProposedChangesContext() {
	const context = useContext(ProposedChangesContext);
	if (!context) throw new Error('useProposedChangesContext must be used within a ProposedChangesContextProvider');
	return context;
}

/* * */

export const ProposedChangesContextProvider = ({ children, stopId }: PropsWithChildren<{ stopId?: string }>) => {
	//

	//
	// A. Setup variables

	const [stopProposedChanges, setStopProposedChanges] = useState<[] | ProposedChange<Stop>[]>([]);

	//
	// B. Fetch data

	const { data: proposedChangesData, error: proposedChangesError, isLoading: proposedChangesLoading } = useSWR<ProposedChange<Stop>[], HttpException>(`${getAppConfig('auth', 'api_url')}/proposed-changes`, { refreshInterval: 2000 });

	//
	// C. Transform data

	useEffect(() => {
		if (!proposedChangesData || proposedChangesError || !stopId) return;
		const stopProposedChanges = proposedChangesData.filter(change => change?.related_id === stopId);
		console.log(proposedChangesData);
		console.log('Filtered proposed changes for stopId', stopId, stopProposedChanges);
		setStopProposedChanges(stopProposedChanges || []);
	}, [proposedChangesData, stopId, proposedChangesLoading]);

	//
	// D. Handle actions

	const approve = async (id: string) => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`,
				'PUT',
				{ status: 'approved' },
			);
		}
		catch (error) {
			console.error('Error approving proposed change:', error);
		}
	};

	const reject = async (id: string) => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`,
				'PUT',
				{ status: 'rejected' },
			);
		}
		catch (error) {
			console.error('Error rejecting proposed change:', error);
		}
	};

	const submit = async (data: CreateProposedChangeDto<Stop>) => {
		try {
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes`, 'POST', data);
		}
		catch (error) {
			console.error('Error submitting proposed change:', error);
		}
	};

	//
	// E. Define context value

	const contextValue: ProposedChangesContextState = useMemo(() => ({
		actions: {
			approve,
			reject,
			submit,
		},
		data: {
			allProposedChangesStops: proposedChangesData ?? [],
			allProposedChangesStopsByRelatedId: stopProposedChanges ?? [],
		},
		flags: {
			error: proposedChangesError,
			loading: proposedChangesLoading,
		},
	}), [proposedChangesData, proposedChangesError, proposedChangesLoading, stopProposedChanges]);

	//
	// E. Render components

	return (
		<ProposedChangesContext.Provider value={contextValue}>
			{children}
		</ProposedChangesContext.Provider>
	);

	//
};
