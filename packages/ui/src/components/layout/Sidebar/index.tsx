'use client';

/* * */

import { useIsActiveDomain } from '@/hooks/use-is-active-domain';
// import { generateIcon } from '@/lib/generate-icon';
import { useMeContext } from '@/contexts';
import { cn } from '@/lib/utils';
import { ActionIcon, Tooltip } from '@mantine/core';
import { IconAlertTriangle, IconBusStop, IconChartArrowsVertical, IconDeviceMobile, IconListCheck, IconUser } from '@tabler/icons-react';
import { apps } from '@tmlmobilidade/lib';
import { Permission } from '@tmlmobilidade/types';
import { getPermission } from '@tmlmobilidade/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export interface SidebarItemProps {
	_id: string
	href: string
	label: string
	permission: Permission<unknown>
}

export interface SidebarProps {
	items: SidebarItemProps[]
}

export default function Sidebar() {
	//
	// A. Render components
	return (
		<div className={cn(styles.container)}>
			<div className={cn(styles.navWrapper)}>
				{apps.map((item) => {
					return (
						<SidebarItem
							key={item.href}
							_id={item._id}
							href={item.href}
							label={item.label}
							permission={item.permission}
						/>
					);
				})}
			</div>
		</div>
	);

	//
}

function SidebarItem({
	_id,
	classNames,
	href,
	label,
	permission,
}: SidebarItemProps & { classNames?: { navButton?: string } }) {
	//
	// A. Setup Variables
	const { data: { user } } = useMeContext();

	const isDisabled = useMemo(() => {
		const userPermission = getPermission(user?.permissions as unknown as Permission<unknown>[], permission.scope, permission.action);
		return !userPermission || (userPermission.action !== permission.action || userPermission.scope !== permission.scope);
	}, [user?.permissions, permission]);

	const isActive = useIsActiveDomain(href) && !isDisabled;

	let icon = null;
	switch (_id) {
		case 'alerts':
			icon = <IconAlertTriangle />;
			break;
		case 'auth':
			icon = <IconUser />;
			break;
		case 'controller':
			icon = <IconChartArrowsVertical />;
			break;
		case 'equipments':
			icon = <IconDeviceMobile />;
			break;
		case 'pulse':
			icon = <IconListCheck />;
			break;
		case 'stops':
			icon = <IconBusStop />;
			break;
	}

	//
	// B. Render components
	return (
		<Tooltip label={label} position="right">
			<a href={href}>
				<ActionIcon
					size="xl"
					className={cn(styles.navButton, classNames?.navButton, {
						[styles.disabled]: isDisabled,
						[styles.selected]: isActive,
					})}
				>
					{icon}
					{/* {typeof icon === 'string' ? generateIcon(icon) : icon} */}
				</ActionIcon>
			</a>
		</Tooltip>
	);
}
