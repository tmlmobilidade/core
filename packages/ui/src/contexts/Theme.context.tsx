'use client';

/* * */

import { useUserPreference } from '@/hooks/use-user-preference';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo } from 'react';

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
		activateTheme: (theme: string | ThemeType) => void
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

	const [activeTheme, setActiveTheme] = useUserPreference<ThemeType>('ui', 'active_theme', AVAILABLE_THEMES[0]._id);

	//
	// B. Handle actions

	useEffect(() => {
		// Apply the active theme to the document
		if (typeof document === 'undefined') return;
		if (typeof activeTheme !== 'string') return;
		document.documentElement.setAttribute('data-theme', activeTheme);
	}, [activeTheme]);

	const handleActivateTheme = (theme: string | ThemeType) => {
		if (!AVAILABLE_THEMES.some(t => t._id === theme)) return;
		setActiveTheme(theme as ThemeType);
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
			{children}
		</ThemeContext.Provider>
	);

	//
};
