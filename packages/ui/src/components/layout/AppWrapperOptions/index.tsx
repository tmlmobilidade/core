'use client';

/* * */

import { Label } from '@/components/display/Label';
import { useMeContext } from '@/contexts';
import { AVAILABLE_THEMES, useThemeContext } from '@/contexts/Theme.context';
import { ActionIcon, ColorSwatch, Menu } from '@mantine/core';
import { IconChevronRight, IconColorSwatch, IconLogout, IconSettings } from '@tabler/icons-react';
import { useEffect } from 'react';

/* * */

interface MenuItem {
	href?: string
	icon: React.ReactNode
	label: string
	onClick?: () => void
	submenu?: MenuItem[]
}

/* * */

export function AppWrapperOptions() {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const themeContext = useThemeContext();

	//
	// B. Define menu structure

	const MENU_ITEMS: MenuItem[] = [
		{
			icon: <IconColorSwatch size={18} />,
			label: 'Temas',
			submenu: AVAILABLE_THEMES.map(item => ({
				icon: <ColorSwatch color={item.primary_color} size={16} />,
				label: item.name,
				onClick: () => {
					themeContext.actions.activateTheme(item._id);
					meContext.actions.updatetheme(item._id);
				},
			})),
		},
		{
			icon: <IconLogout size={18} />,
			label: 'Logout',
			onClick: meContext.actions.logout,
		},
	];

	useEffect(() => {
		if (!meContext.flags.loading && meContext.data.user?.themeId) {
			themeContext.actions.activateTheme(meContext.data.user.themeId as typeof AVAILABLE_THEMES[number]['_id']);
		}
	}, [meContext.flags.loading, meContext.data.user?.themeId]);

	//
	// D. Render helpers

	const renderMenuItem = (item: MenuItem) => {
		if (item.submenu) {
			return (
				<Menu.Item
					key={item.label}
					leftSection={item.icon}
					px={12}
					py={8}
				>
					<Menu offset={8} position="left-start" shadow="md" trigger="hover" width={180}>
						<Menu.Target>
							<div style={{
								alignItems: 'center',
								cursor: 'pointer',
								display: 'flex',
								justifyContent: 'space-between',
								width: '100%',
							}}
							>
								<Label size="md" singleLine>{item.label}</Label>
								<IconChevronRight size={16} />
							</div>
						</Menu.Target>
						<Menu.Dropdown>
							{item.submenu.map((subItem, subIndex) => (
								<Menu.Item
									key={subItem.label}
									leftSection={subItem.icon}
									onClick={subItem.onClick}
									px={12}
									py={6}
									style={{
										backgroundColor: themeContext.data.active_theme === AVAILABLE_THEMES[subIndex]?._id
											? 'var(--mantine-color-gray-1)'
											: undefined,
									}}
								>
									<Label size="md" singleLine>{subItem.label}</Label>
								</Menu.Item>
							))}
						</Menu.Dropdown>
					</Menu>
				</Menu.Item>
			);
		}

		return (
			<Menu.Item
				key={item.label}
				component={item.href ? 'a' : 'button'}
				href={item.href}
				leftSection={item.icon}
				onClick={item.onClick}
				px={12}
				py={8}
			>
				<Label size="md" singleLine>{item.label}</Label>
			</Menu.Item>
		);
	};

	//
	// E. Render components

	return (
		<Menu offset={0} position="bottom-end" shadow="lg" width={200}>
			<Menu.Target>
				<ActionIcon color="gray" variant="subtle">
					<IconSettings size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Label>Personalização</Menu.Label>
				{MENU_ITEMS.slice(0, 1).map(renderMenuItem)}

				<Menu.Divider />

				<Menu.Label>Conta</Menu.Label>
				{MENU_ITEMS.slice(1).map(renderMenuItem)}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
