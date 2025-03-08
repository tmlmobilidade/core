'use client';

import { swrFetcher } from '@/lib/http';
// import { User } from '@tmlmobilidade/core-types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { CMIcon } from '../common';
import AppWrapper from '../layout/AppWrapper';
import { SidebarItemProps } from '../layout/Sidebar';

interface MeContextState {
	data: {
		sidebar: SidebarItemProps[]
		user: any
	}
	flags: {
		error: null | string
		loading: boolean
	}
}

export interface MeContextProviderProps {
	children: React.ReactNode
	initialSidebar?: MeContextState['data']['sidebar']
	initialUser?: MeContextState['data']['user']
	meApiUrl: string
}

const MeContext = createContext<MeContextState | undefined>(undefined);

export function useMeContext() {
	const context = useContext(MeContext);
	if (!context) {
		throw new Error('useMeContext must be used within a MeContextProvider');
	}
	return context;
}

export const MeContextProvider = ({
	children,
	initialSidebar,
	initialUser,
	meApiUrl,
}: MeContextProviderProps) => {
	//
	// A. Setup variables
	const [userState, setUserState] = useState<MeContextState['data']['user']>(
		initialUser ?? ({}),
	);
	const [sidebarState, setSidebarState] = useState<
		MeContextState['data']['sidebar']
	>(initialSidebar ?? []);

	const { data, error, isLoading } = useSWR<{ sidebar: SidebarItemProps[], user: any }>(
		meApiUrl,
		swrFetcher,
	);

	// Update user
	useEffect(() => {
		if (data?.user) setUserState(data.user);
		if (data?.sidebar) setSidebarState(data.sidebar);
	}, [data]);

	//
	// E. Define context value
	const contextValue: MeContextState = useMemo(
		() => ({
			data: {
				sidebar: sidebarState,
				user: userState,
			},
			flags: {
				error: error,
				loading: isLoading,
			},
		}),
		[userState, isLoading, error, sidebarState],
	);

	if (contextValue.flags.loading) {
		return <div>loading...</div>;
	}

	//
	// F. Render components
	return (
		<MeContext.Provider value={contextValue}>

			<AppWrapper
				icon={<CMIcon />}
				sidebarItems={sidebarState}
				headerProps={{
					user_name: userState?.first_name,
				}}
			>
				{children}
			</AppWrapper>
		</MeContext.Provider>
	);
};
