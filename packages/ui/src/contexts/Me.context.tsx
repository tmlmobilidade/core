'use client';

/* * */

const meApiUrl = process.env.NEXT_PUBLIC_AUTH_URL + '/api/me';

/* * */

import { swrFetcher } from '@/lib/http';
import { type User } from '@tmlmobilidade/types';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

/* * */

interface MeContextState {
	data: {
		user: null | User
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
	// A. Setup variables

	const [userState, setUserState] = useState<MeContextState['data']['user']>(null);

	//
	// B. Fetch data

	const { data, error, isLoading } = useSWR<{ user: User }>(meApiUrl, swrFetcher);

	//
	// C. Handle actions

	useEffect(() => {
		if (!data?.user) return;
		setUserState(data.user);
	}, [data]);

	//
	// D. Define context value

	const contextValue: MeContextState = useMemo(() => ({
		data: {
			user: userState,
		},
		flags: {
			error: error,
			loading: isLoading,
		},
	}), [userState, isLoading, error]);

	//
	// E. Render components

	if (contextValue.flags.loading) {
		return <div>loading me...</div>;
	}

	return (
		<MeContext.Provider value={contextValue}>
			{children}
		</MeContext.Provider>
	);
};
