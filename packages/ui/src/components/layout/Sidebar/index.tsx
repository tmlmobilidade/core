'use client';

/* * */

import { useIsActiveDomain } from '@/hooks/use-is-active-domain';
import { generateIcon } from '@/lib/generate-icon';
import { cn } from '@/lib/utils';
import { ActionIcon, Tooltip } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export interface SidebarItemProps {
	disabled?: boolean
	href: string
	icon: React.ReactNode | string
	label: string
}

export interface SidebarProps {
	items: SidebarItemProps[]
}

export default function Sidebar({
	items,
}: SidebarProps) {
	//
	// A. Render components
	return (
		<div className={cn(styles.container)}>
			<div className={cn(styles.navWrapper)}>
				{items.map((item) => {
					return (
						<SidebarItem
							key={item.href}
							disabled={item.disabled}
							href={item.href}
							icon={item.icon}
							label={item.label}
						/>
					);
				})}
			</div>
		</div>
	);

	//
}

function SidebarItem({
	classNames,
	disabled,
	href,
	icon,
	label,
}: SidebarItemProps & { classNames?: { navButton?: string } }) {
	const isActive = useIsActiveDomain(href);

	return (
		<Tooltip label={label} position="right">
			<a href={href}>
				<ActionIcon
					size="xl"
					className={cn(styles.navButton, classNames?.navButton, {
						[styles.disabled]: disabled,
						[styles.selected]: isActive,
					})}
				>
					{typeof icon === 'string' ? generateIcon(icon) : icon}
				</ActionIcon>
			</a>
		</Tooltip>
	);
}
