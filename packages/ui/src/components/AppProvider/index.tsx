'use client';

/* * */

import { MapContextProvider } from '@/contexts/Map.context';
import { MeContextProvider } from '@/contexts/Me.context';
import { ThemeContextProvider } from '@/contexts/Theme.context';
import { swrFetcher } from '@tmlmobilidade/utils';
import { type PropsWithChildren } from 'react';
import { SWRConfig, type SWRConfiguration } from 'swr';

/**
 * `AppProvider` component that wraps the application with necessary context providers.
 * This should wrap the whole authenticated application. For non-authenticated
 * parts of the application, use only the `BaseProvider` component.
 */
export function AppProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const swrSettings: SWRConfiguration = {
		fetcher: swrFetcher,
		refreshInterval: 60_000, // 1 minute
		refreshWhenHidden: true,
		revalidateIfStale: true,
		revalidateOnFocus: true,
		revalidateOnMount: true,
	};

	//
	// B. Render components

	return (
		<SWRConfig value={swrSettings}>
			<MeContextProvider>
				<ThemeContextProvider>
					<MapContextProvider>
						{children}
					</MapContextProvider>
				</ThemeContextProvider>
			</MeContextProvider>
		</SWRConfig>
	);

	//
}
