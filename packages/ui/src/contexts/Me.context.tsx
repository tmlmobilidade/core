'use client';

import { useToast } from '@/hooks';

/* * */

import { getAppConfig, HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type User } from '@tmlmobilidade/types';
import { type HasPermissionResourceArgs, hasPermissionResource as hasPermissionResourceUtils, hasPermission as hasPermissionUtils, swrFetcher } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';
/* * */

interface MeContextState {
	actions: {
		hasPermission: (scope: string, action: string) => boolean
		hasPermissionResource: <T>(args: HasPermissionResourceArgs<T>) => boolean
	}
	data: {
		user: undefined | User
	}
	flags: {
		error?: HttpException
		loading: boolean
	}
}

/* * */

const MeContext = createContext<MeContextState | undefined>(undefined);

export function useMeContext() {
	const context = useContext(MeContext);
	if (!context) throw new Error('useMeContext must be used within a MeContextProvider');
	return context;
}

/* * */

export const MeContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Fetch data

	const { data, error, isLoading } = useSWR<User, HttpException>(`${getAppConfig('auth', 'api_url')}/users/me`, swrFetcher);

	//
	// B. Define actions

	function hasPermission(scope: string, action: string) {
		if (!data || !data.permissions) return false;
		return hasPermissionUtils(data.permissions, scope, action);
	}

	function hasPermissionResource<T>(args: HasPermissionResourceArgs<T>) {
		if (!data || !data.permissions) return false;
		return hasPermissionResourceUtils({ ...args, permissions: data.permissions });
	}

	useEffect(() => {
		if (!error) return;

		async function logout() {
			const { redirect, RedirectType } = await import('next/navigation');
			document.cookie = 'session_token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
			redirect(getAppConfig('auth', 'frontend_url'), RedirectType.replace);
		}

		useToast.error({
			message: error.message,
			title: 'Erro ao carregar dados do utilizador',
		});

		if (error.statusCode === HttpStatus.UNAUTHORIZED || error.statusCode === HttpStatus.NOT_FOUND) {
			logout();
		}
	}, [error]);

	//
	// C. Define context value

	const contextValue: MeContextState = useMemo(() => ({
		actions: {
			hasPermission,
			hasPermissionResource,
		},
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
