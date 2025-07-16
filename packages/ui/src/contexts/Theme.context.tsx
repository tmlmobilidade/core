'use client';

import { Loader } from '@/components';
/* * */

import { themeData } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider, DatesProviderSettings } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { createContext, type PropsWithChildren, Suspense, useContext, useEffect, useMemo, useState } from 'react';

/* * */

export const AVAILABLE_THEMES = [
	{ _id: 'ocean', name: 'Ocean', primary_color: 'var(--theme-ocean-color-primary)' },
	{ _id: 'park', name: 'Park', primary_color: 'var(--theme-park-color-primary)' },
	{ _id: 'path', name: 'Path', primary_color: 'var(--theme-path-color-primary)' },
	{ _id: 'pool', name: 'Pool', primary_color: 'var(--theme-pool-color-primary)' },
	{ _id: 'royal', name: 'Royal', primary_color: 'var(--theme-royal-color-primary)' },
	{ _id: 'street', name: 'Street', primary_color: 'var(--theme-street-color-primary)' },
] as const;

/* * */

export type ThemeType = (typeof AVAILABLE_THEMES)[number]['_id'];

interface ThemeContextState {
	actions: {
		activateTheme: (theme: ThemeType) => void
	}
	data: {
		active_theme: ThemeType
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

	const [activeTheme, setActiveTheme] = useState<ThemeType>(AVAILABLE_THEMES[0]._id);

	const mantineDatesSettings: Partial<DatesProviderSettings> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		weekendDays: [6, 0],
	};

	//
	// B. Handle actions

	useEffect(() => {
		if (typeof document === 'undefined') return;
		document.documentElement.setAttribute('data-theme', activeTheme);
	}, [activeTheme]);

	const handleActivateTheme = (theme: ThemeType) => {
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
		<Suspense fallback={<Loader size="xl" />}>
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
		</Suspense>
	);

	//
};
