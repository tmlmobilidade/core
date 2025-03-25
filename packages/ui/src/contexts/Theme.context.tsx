'use client';

/* * */

import { themeData } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider, DatesProviderSettings } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

/* * */

export const AVAILABLE_THEMES = ['ocean', 'park', 'path', 'pool', 'royal', 'street'] as const;

/* * */

interface ThemeContextState {
	actions: {
		activateTheme: (theme: typeof AVAILABLE_THEMES[number]) => void
	}
	data: {
		active_theme: typeof AVAILABLE_THEMES[number]
	}
}

/* * */

const ThemeContext = createContext<ThemeContextState | undefined>(undefined);

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useThemeContext must be used within a ThemeContextProvider');
	}
	return context;
}

/* * */

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const [activeTheme, setActiveTheme] = useState<typeof AVAILABLE_THEMES[number]>(AVAILABLE_THEMES[0]);

	const mantineDatesSettings: Partial<DatesProviderSettings> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// B. Handle actions

	useEffect(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', activeTheme);
	}, [activeTheme]);

	const handleActivateTheme = (theme: typeof AVAILABLE_THEMES[number]) => {
		setActiveTheme(theme);
	};

	//
	// C. Define context value

	const contextValue: ThemeContextState = useMemo(() => ({
		actions: {
			activateTheme: handleActivateTheme,
		},
		data: {
			active_theme: activeTheme,
		},
	}), [activeTheme]);

	//
	// D. Render components

	return (
		<ThemeContext.Provider value={contextValue}>
			<MantineProvider defaultColorScheme="auto" theme={themeData}>
				<DatesProvider settings={mantineDatesSettings}>
					<ModalsProvider>
						<Notifications styles={{ root: { marginTop: '60px' } }} />
						{children}
					</ModalsProvider>
				</DatesProvider>
			</MantineProvider>
		</ThemeContext.Provider>
	);

	//
};
