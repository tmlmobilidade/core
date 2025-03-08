'use client';

import { getCssVariableValue } from '@/lib/getCssVariableValue';
import { ColorSwatch, Menu } from '@mantine/core';
import { useEffect, useState } from 'react';

import { THEMES } from '../ThemeProvider';
import useTheme from '../ThemeProvider/use-theme';
import styles from './styles.module.css';

interface ThemeSwitcherProps {
	onThemeChange?: (theme: string) => void
}

export default function ThemeSwitcher({ onThemeChange }: ThemeSwitcherProps) {
	// State to hold the primary colors
	const { setTheme, theme } = useTheme();
	const [themeColors, setThemeColors] = useState<Record<string, string>>({});

	useEffect(() => {
		// Function to get primary colors for all themes
		const getThemeColors = () => {
			const colors: Record<string, string> = {};
			THEMES.forEach((theme) => {
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

	const handleThemeChange = (theme: typeof THEMES[number]) => {
		setTheme(theme);
		onThemeChange?.(theme);
	};

	// Render the primary colors
	return (
		<Menu classNames={styles}>
			<Menu.Target>
				<div style={{ cursor: 'pointer' }}>
					<ColorSwatch color={themeColors[theme] ?? ''} />
				</div>
			</Menu.Target>
			<Menu.Dropdown>
				{THEMES.map(t => (
					<Menu.Item key={t} value={t}>
						<ColorSwatch color={themeColors[t] ?? ''} onClick={() => handleThemeChange(t)} />
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>

	);
}
