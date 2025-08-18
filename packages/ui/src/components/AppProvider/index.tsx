'use client';

/* * */

import { MapContextProvider } from '@/contexts/Map.context';
import { MeContextProvider } from '@/contexts/Me.context';
import { ThemeContextProvider } from '@/contexts/Theme.context';
import { type PropsWithChildren } from 'react';
import { SWRConfig, type SWRConfiguration } from 'swr';

/* * */

export function AppProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const swrSettings: SWRConfiguration = {
		async fetcher(...args: Parameters<typeof fetch>) {
			const res = await fetch(...args);
			if (!res.ok) {
				const errorDetails = await res.json();
				const error = new Error(errorDetails.message || 'An error occurred while fetching data.');
				const customError = {
					...error,
					description: errorDetails.description || 'No additional information was provided by the API.',
					status: res.status,
				};
				throw customError;
			}
			return res.json();
		},
		refreshInterval: 300_000, // 5 minutes
		revalidateOnFocus: true,
		revalidateOnMount: true,
	};

	//
	// B. Render components

	return (
		<SWRConfig value={swrSettings}>
			<ThemeContextProvider>
				<MeContextProvider>
					<MapContextProvider>
						{children}
					</MapContextProvider>
				</MeContextProvider>
			</ThemeContextProvider>
		</SWRConfig>
	);

	//
}
