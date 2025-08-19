'use client';

/* * */

import {
	Menu as MantineMenu,
	MenuDividerProps as MantineMenuDividerProps,
	MenuDropdownProps as MantineMenuDropdownProps,
	MenuItemProps as MantineMenuItemProps,
	MenuLabelProps as MantineMenuLabelProps,
	MenuProps as MantineMenuProps,
	MenuTargetProps as MantineMenuTargetProps,
} from '@mantine/core';

import styles from './styles.module.css';

export type MenuProps = MantineMenuProps;
export type MenuTargetProps = MantineMenuTargetProps;
export type MenuDropdownProps = MantineMenuDropdownProps;
export type MenuItemProps = MantineMenuItemProps & { href?: string };
export type MenuDividerProps = MantineMenuDividerProps;
export type MenuLabelProps = MantineMenuLabelProps;

export function Menu(props: MenuProps) {
	return <MantineMenu {...props} classNames={{ arrow: styles.arrow }} />;
}

Menu.Target = function MenuTarget(props: MenuTargetProps) {
	return <MantineMenu.Target {...props} />;
};

Menu.Dropdown = function MenuDropdown(props: MenuDropdownProps) {
	return <MantineMenu.Dropdown {...props} className={styles.dropdown} />;
};

Menu.Item = function MenuItem({ href, ...props }: MenuItemProps) {
	return (
		<MantineMenu.Item
			className={styles.item}
			component={href ? 'a' : undefined}
			href={href}
			{...props}
		/>
	);
};

Menu.Divider = function MenuDivider(props: MenuDividerProps) {
	return <MantineMenu.Divider {...props} className={styles.divider} />;
};

Menu.Label = function MenuLabel(props: MenuLabelProps) {
	return <MantineMenu.Label {...props} className={styles.label} />;
};
