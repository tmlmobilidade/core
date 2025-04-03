'use client';

/* * */

import { Label } from '@/components/common/Label';
import { Section } from '@/components/layout/Section';
import { AVAILABLE_THEMES, type ThemeType, useThemeContext } from '@/contexts/Theme.context';
import { ColorSwatch, Menu } from '@mantine/core';

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

	//
	// B. Handle actions

	const handleThemeChange = (theme: ThemeType) => {
		themeContext.actions.activateTheme(theme);
		onThemeChange?.(theme);
	};

	//
	// C. Render components

	return (
		<Menu>
			<Menu.Target>
				<div style={{ cursor: 'pointer' }}>
					<ColorSwatch color="var(--color-primary)" />
				</div>
			</Menu.Target>
			<Menu.Dropdown>
				{AVAILABLE_THEMES.map(item => (
					<Menu.Item key={item._id} onClick={() => handleThemeChange(item._id)} value={item._id}>
						<Section alignItems="center" flexDirection="row" gap="sm" padding={null}>
							<ColorSwatch color={item.primary_color} />
							<Label caps singleLine>{item.name}</Label>
						</Section>
					</Menu.Item>
				))}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
