'use client';


/* * */

import { AVAILABLE_THEMES, useThemeContext } from '@/contexts/Theme.context';
import { getCssVariableValue } from '@/lib/getCssVariableValue';
import { ColorSwatch, Menu } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ThemeSwitcherProps {
	onThemeChange?: (theme: string) => void
}

/* * */

export function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
	//

	//
	// A. Setup variables

	const themeContext = useThemeContext();
	const [themeColors, setThemeColors] = useState<Record<string, string>>({});

	//
	// B. Handle actions

	useEffect(() => {
		// Function to get primary colors for all themes
		const getThemeColors = () => {
			const colors: Record<string, string> = {};
			AVAILABLE_THEMES.forEach((theme) => {
				// Set the data-theme attribute to get the correct CSS variables
				document.documentElement.setAttribute('data-theme', theme);
				// Get the primary color from the CSS variables
				const primaryColor = getCssVariableValue('--color-primary')?.trim();
				colors[theme] = primaryColor ?? '';
			});
			setThemeColors(colors);
		};
		getThemeColors();
	}, []);

	const handleThemeChange = (theme: typeof AVAILABLE_THEMES[number]) => {
		themeContext.actions.activateTheme(theme);
		onThemeChange?.(theme);
	};

	//
	// C. Render components

	return (
		<Menu classNames={styles}>
			<Menu.Target>
				<div style={{ cursor: 'pointer' }}>
					<ColorSwatch color={themeColors[themeContext.data.active_theme] ?? ''} />
				</div>
			</Menu.Target>
			<Menu.Dropdown>
				{AVAILABLE_THEMES.map(t => (
					<Menu.Item key={t} value={t}>
						<ColorSwatch color={themeColors[t] ?? ''} onClick={() => handleThemeChange(t)} />
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
