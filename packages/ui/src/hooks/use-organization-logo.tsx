'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface GetLogoSchema {
	logo_dark: null | string
	logo_light: null | string
}

/**
 * A hook to get organization logo as state.
 * @returns The current organization logo value.
 */

export function useOrganizationLogo(organization_id: string): null | string | undefined {
	//

	//
	// A. Setup variables

	const theme = document.documentElement.getAttribute('data-mode');
	const { data, error, isLoading } = useSWR<GetLogoSchema, HttpException>(`${getAppConfig('auth', 'api_url')}/organizations/${organization_id}/logo`);

	//
	// B. Handle actions

	const themeLogo = useMemo(() => {
		if (!data || isLoading || error || !theme) return undefined;
		return theme === 'dark' ? data.logo_dark : data.logo_light;
	}, [data, isLoading, error, theme]);
	//
	// C. Render components

	return themeLogo;

	//
}
