'use client';

/* * */

import { themeData } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider, DatesProviderSettings } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { createContext, type PropsWithChildren, useContext, useEffect } from 'react';

/* * */

const ThemeAnonymousContext = createContext(undefined);

export function useThemeAnonymousContext() {
	const context = useContext(ThemeAnonymousContext);
	if (!context) {
		throw new Error('useThemeAnonymousContext must be used within a ThemeAnonymousContextProvider');
	}
	return context;
}

/* * */

export const ThemeAnonymousContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: Partial<DatesProviderSettings> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		weekendDays: [6, 0],
	};

	//
	// B. Handle actions

	useEffect(() => {
		// Apply the active theme to the document
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', 'ocean');
	}, []);

	//
	// C. Render components

	return (
		<ThemeAnonymousContext.Provider value={undefined}>
			<MantineProvider defaultColorScheme="auto" theme={themeData}>
				<DatesProvider settings={mantineDatesSettings}>
					<Notifications styles={{ root: { marginTop: '60px' } }} />
					{children}
				</DatesProvider>
			</MantineProvider>
		</ThemeAnonymousContext.Provider>
	);

	//
};
