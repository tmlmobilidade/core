'use client';

/* * */

import { swrFetcher } from '@/lib/http';
import { getAppBaseUrl } from '@tmlmobilidade/lib';
import { type User } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface MeContextState {
	data: {
		user: undefined | User
	}
	flags: {
		error: null | string
		loading: boolean
	}
}

/* * */

const MeContext = createContext<MeContextState | undefined>(undefined);

export function useMeContext() {
	const context = useContext(MeContext);
	if (!context) {
		throw new Error('useMeContext must be used within a MeContextProvider');
	}
	return context;
}

/* * */

export const MeContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Fetch data

	const { data, error, isLoading } = useSWR<User>(`${getAppBaseUrl('auth')}/api/users/me`, swrFetcher);

	//
	// B. Define context value

	const contextValue: MeContextState = useMemo(() => ({
		data: {
			user: data,
		},
		flags: {
			error: error,
			loading: isLoading,
		},
	}), [data, isLoading, error]);

	//
	// C. Render components

	return (
		<MeContext.Provider value={contextValue}>
			{children}
		</MeContext.Provider>
	);

	//
};
