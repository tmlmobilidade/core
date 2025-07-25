'use client';

/* * */

import { ErrorDisplay } from '@/components/display/ErrorDisplay';
import { LoadingOverlay } from '@/components/loaders/LoadingOverlay';
import { useToast } from '@/hooks';
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

	const { data: meData, error: meError, isLoading: meLoading } = useSWR<User, HttpException>(`${getAppConfig('auth', 'api_url')}/users/me`, swrFetcher);

	//
	// B. Handle actions

	useEffect(() => {
		// Skip if no error
		if (!meError) return;
		// Show error toast
		useToast.error({ message: meError.message, title: 'Erro ao carregar dados do utilizador' });
		// Redirect to login if unauthorized or not found
		if (meError.statusCode === HttpStatus.UNAUTHORIZED || meError.statusCode === HttpStatus.NOT_FOUND) {
			window.location.href = `${getAppConfig('auth', 'frontend_url')}/login`;
		}
	}, [meError]);

	function hasPermission(scope: string, action: string) {
		if (!meData || !meData.permissions) return false;
		return hasPermissionUtils(meData.permissions, scope, action);
	}

	function hasPermissionResource<T>(args: HasPermissionResourceArgs<T>) {
		if (!meData || !meData.permissions) return false;
		return hasPermissionResourceUtils({ ...args, permissions: meData.permissions });
	}

	//
	// C. Define context value

	const contextValue: MeContextState = useMemo(() => ({
		actions: {
			hasPermission,
			hasPermissionResource,
		},
		data: {
			user: meData,
		},
		flags: {
			error: meError,
			loading: meLoading,
		},
	}), [meData, meLoading, meError]);

	//
	// D. Render components

	if (meLoading) {
		return <LoadingOverlay fullscreen />;
	}

	if (meError) {
		return <ErrorDisplay message={meError.message} />;
	}

	return (
		<MeContext.Provider value={contextValue}>
			{children}
		</MeContext.Provider>
	);

	//
};
