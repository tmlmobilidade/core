'use client';

/* * */

import { files } from '@tmlmobilidade/interfaces';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { type Organization } from '@tmlmobilidade/types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

/**
 * A hook to get organization logo as state.
 * @returns The current organization logo value.
 */

export function useOrganizationLogo(organization_id: string): string | undefined {
	//

	//
	// A. Setup variables

	const theme = document.getElementsByTagName('html')[0]?.getAttribute('data-mantine-color-scheme');
	const [activeLogoData, setActiveLogoData] = useState<string | undefined>(undefined);
	const { data: raw, error: error, isLoading: loading } = useSWR<Organization, HttpException>(`${getAppConfig('auth', 'api_url')}/organizations/${organization_id}`);

	//
	// B. Handle actions

	useEffect(() => {
		if (!raw || organization_id || error) return;
		(async () => {
			if (!raw) return;

			const logoId = theme === 'dark' ? raw.logo_dark || raw.logo_light : theme === 'light' ? raw.logo_light || raw.logo_dark : raw.logo_dark || raw.logo_light;

			if (logoId) {
				const file = await files.findById(logoId);
				if (file?.url) {
					setActiveLogoData(file?.url);
				}
			}
		})();
	}, [raw, organization_id, theme, loading]);

	//
	// C. Render components

	return activeLogoData;

	//
}
