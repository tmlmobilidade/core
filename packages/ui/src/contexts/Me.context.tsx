'use client';

/* * */

import { ErrorDisplay } from '@/components/display/ErrorDisplay';
import { LoadingOverlay } from '@/components/loaders/LoadingOverlay';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { type User, type UserPreferenceValue } from '@tmlmobilidade/types';
import { fetchData, type HasPermissionResourceArgs, hasPermissionResource as hasPermissionResourceUtils, hasPermission as hasPermissionUtils, swrFetcher } from '@tmlmobilidade/utils';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface MeContextState {
	actions: {
		getPreference: <T extends UserPreferenceValue>(scope: string, key: string) => T | undefined
		hasPermission: (scope: string, action: string) => boolean
		hasPermissionResource: <T>(args: HasPermissionResourceArgs<T>) => boolean
		logout: () => Promise<void>
		updatePreference: (scope: string, key: string, value: undefined | UserPreferenceValue) => Promise<void>
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
	// B. Fetch data

	const { data: meData, error: meError, isLoading: meLoading, mutate: meMutate } = useSWR<User, HttpException>(`${getAppConfig('auth', 'api_url')}/users/me`, swrFetcher);

	//
	// C. Handle actions

	useEffect(() => {
		// Skip if data is still loading
		if (meLoading) return;
		// If a user is not available redirect to login page
		if (!meData) window.location.href = `${getAppConfig('auth', 'frontend_url')}/login`;
	}, [meLoading, meData]);

	function hasPermission(scope: string, action: string) {
		if (!meData || !meData.permissions) return false;
		return hasPermissionUtils(meData.permissions, scope, action);
	}

	function hasPermissionResource<T>(args: HasPermissionResourceArgs<T>) {
		if (!meData || !meData.permissions) return false;
		return hasPermissionResourceUtils({ ...args, permissions: meData.permissions });
	}

	async function logout() {
		// Call the logout endpoint
		await fetch(`${getAppConfig('auth', 'api_url')}/logout`, { credentials: 'include' });
		// Mutate the SWR cache to remove user data
		meMutate(undefined, { revalidate: true });
		// Redirect to login page
		window.location.href = `${getAppConfig('auth', 'frontend_url')}/login`;
	}

	function getPreference<T extends UserPreferenceValue>(scope: string, key: string): T | undefined {
		return meData?.preferences?.[scope]?.[key] as T | undefined;
	}

	async function updatePreference(scope: string, key: string, value: undefined | UserPreferenceValue) {
		console.log('[meContext] Updating preference', { key, scope, value });
		// Skip if user data is not available
		if (!meData) return;
		console.log('[meContext] Current preferences', meData.preferences);
		// Merge current with updated preferences
		const currentPreferences = meData.preferences ?? {};
		const currentScope = currentPreferences[scope] ?? {};
		const updatedScope = { ...currentScope, [key]: value };
		const updatedPreferences = { ...currentPreferences, [scope]: updatedScope };
		console.log('[meContext] Updated preferences', updatedPreferences);
		// Call the update endpoint
		const response = await fetchData(`${getAppConfig('auth', 'frontend_url')}/api/users/me`, 'PUT', { preferences: updatedPreferences });
		console.log('[meContext] Update response', response);
		// Mutate the SWR cache to update user data
		meMutate();
	}

	//
	// D. Define context value

	const contextValue: MeContextState = useMemo(() => ({
		actions: {
			getPreference,
			hasPermission,
			hasPermissionResource,
			logout,
			updatePreference,
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
	// E. Render components

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
