'use client';

/* * */

const meApiUrl = process.env.NEXT_PUBLIC_AUTH_URL + '/api/users/me';

/* * */

import { swrFetcher } from '@/lib/http';
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

	const { data, error, isLoading } = useSWR<User>(meApiUrl, swrFetcher);

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

	// if (contextValue.flags.loading) {
	// 	return <div>loading me...</div>;
	// }

	return (
		<MeContext.Provider value={contextValue}>
			{children}
		</MeContext.Provider>
	);
};
