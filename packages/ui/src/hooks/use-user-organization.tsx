'use client';

/* * */
import { files } from '@tmlmobilidade/interfaces';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { type Organization } from '@tmlmobilidade/types';
import { useMeContext } from 'index';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

/* * */

/**
 * A hook to get user organization as state.
 * @returns The current organization value.
 */

export function useUserOrganization(): [Organization | undefined, (value: Organization | undefined) => void, () => Promise<string | undefined>] {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const { data: raw, error: error, isLoading: loading } = useSWR<Organization[], HttpException>(`${getAppConfig('auth', 'api_url')}/organizations`);
	const [orgData, setOrgData] = useState<Organization | undefined>(undefined);
	const theme = document.getElementsByTagName('html')[0]?.getAttribute('data-mantine-color-scheme');

	//
	// B. Handle actions

	useEffect(() => {
		if (!raw || !meContext.data.user?.organization_id || error) return;
		(async () => {
			const org = await getOrganizationByID(meContext.data.user?.organization_id || '');
			setOrgData(org);
		})();
	}, [raw, meContext.data.user, loading]);

	const getOrganizationByID = async (id: string) => {
		if (!raw) return undefined;

		const foundOrg: Organization | undefined = raw.find(org => org._id === id);

		if (foundOrg) setOrgData(foundOrg);
		return foundOrg;
	};

	const getLogoUrl = async (): Promise<string | undefined> => {
		if (!orgData) return undefined;
		let logoId: string | undefined;
		if (theme === 'dark') {
			logoId = orgData.logo_dark ?? undefined;
		}
		else if (theme === 'light') {
			logoId = orgData.logo_light ?? undefined;
		}
		else {
			logoId = orgData.logo_dark ?? orgData.logo_light ?? undefined;
		}

		const file = await files.findById(logoId);

		if (file?.url) {
			return file.url;
		}
		return orgData.logo_dark || orgData.logo_light || undefined;
	};

	//
	// C. Render components

	return [orgData, setOrgData, getLogoUrl];

	//
}
