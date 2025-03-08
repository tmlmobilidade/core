'use client';

/* * */

import { useContext } from 'react';

import { ThemeContext, ThemeContextType } from './index';

/* * */

export default function useTheme(): ThemeContextType {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider');
	}
	return context;
};
