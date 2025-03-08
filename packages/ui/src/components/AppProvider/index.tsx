'use client';

/* * */

import { MapProvider } from '@vis.gl/react-maplibre';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { SWRConfig, type SWRConfiguration } from 'swr';

import { MapOptionsContextProvider } from '../providers/MapOptions.context';
import { MeContextProvider, type MeContextProviderProps } from '../providers/Me.context';
import { ThemeProvider, type ThemeProviderProps } from '../theme';

/* * */

export interface AppProviderProps extends MeContextProviderProps, ThemeProviderProps {
	children: React.ReactNode
}

export function AppProvider({ children, fontFamilyStyle, initialSidebar, initialTheme, initialUser, meApiUrl }: AppProviderProps) {
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
		refreshInterval: 900000, // 15 minutes
		revalidateOnFocus: true,
		revalidateOnMount: true,
	};

	//
	// B. Render components

	return (
		<ThemeProvider fontFamilyStyle={fontFamilyStyle} initialTheme={initialTheme}>
			<SWRConfig value={swrSettings}>
				<NuqsAdapter>
					<MapOptionsContextProvider>
						<MapProvider>
							<MeContextProvider initialSidebar={initialSidebar} initialUser={initialUser} meApiUrl={meApiUrl}>
								{children}
							</MeContextProvider>
						</MapProvider>
					</MapOptionsContextProvider>
				</NuqsAdapter>
			</SWRConfig>
		</ThemeProvider>
	);

	//
}
