'use client';

/* * */

import { themeData } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider, DatesProviderSettings } from '@mantine/dates';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
// import { Work_Sans } from 'next/font/google';
import { createContext, useEffect, useMemo, useState } from 'react';

/* * */

export const THEMES = ['ocean', 'park', 'path', 'pool', 'royal', 'street'] as const;

// const workSans = Work_Sans({
// 	display: 'swap',
// 	subsets: ['latin'],
// 	variable: '--font-work-sans',
// 	weight: ['600', '700'],
// });

// Define the context value type
export interface ThemeContextType {
	setTheme: (theme: typeof THEMES[number]) => void
	theme: typeof THEMES[number]
}

export const ThemeContext = createContext<ThemeContextType>({
	setTheme: () => {},
	theme: THEMES[0],
});

export interface ThemeProviderProps {
	children: React.ReactNode
	fontFamilyStyle?: string
	initialTheme?: typeof THEMES[number]
}

/* * */

export default function ThemeProvider({ children, fontFamilyStyle, initialTheme }: ThemeProviderProps) {
	//

	//
	// A. Setup variables

	const [currentTheme, setCurrentTheme] = useState(initialTheme || THEMES[0]);

	const mantineDatesSettings: Partial<DatesProviderSettings> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		timezone: 'Europe/Lisbon',
		weekendDays: [6, 0],
	};

	//
	// B. Define context value

	useEffect(() => {
		const root = document.documentElement;
		root.setAttribute('data-theme', currentTheme);
		// root.style.setProperty('--font-family', workSans.style.fontFamily);
		root.style.setProperty('--font-family', fontFamilyStyle || 'system');
	}, [currentTheme]);

	//
	// C. Define context value

	const contextValue = useMemo(() => ({
		setTheme: (theme: typeof THEMES[number]) => setCurrentTheme(theme),
		theme: currentTheme,
	}), [currentTheme]);

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
}
