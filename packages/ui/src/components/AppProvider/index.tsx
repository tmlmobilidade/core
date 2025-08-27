'use client';

/* * */

import { MapContextProvider } from '@/contexts/Map.context';
import { MeContextProvider } from '@/contexts/Me.context';
import { ThemeContextProvider } from '@/contexts/Theme.context';
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
