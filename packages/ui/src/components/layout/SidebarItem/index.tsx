'use client';

/* * */

import { useMeContext } from '@/contexts';
import { useIsActiveDomain } from '@/hooks/use-is-active-domain';
import { IconAlertTriangle, IconBusStop, IconChartArrowsVertical, IconDeviceMobile, IconListCheck, IconUser } from '@tabler/icons-react';
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

/* * */

export function SidebarItem({ _id, href, label, permission }: SidebarItemProps) {
	//

	//
	// A. Setup Variables

	const meContext = useMeContext();

	//
	// B. Transform data

	const isDisabled = useMemo(() => {
		const userPermission = getPermission(meContext.data.user?.permissions as unknown as Permission<unknown>[], permission.scope, permission.action);
		return !userPermission || (userPermission.action !== permission.action || userPermission.scope !== permission.scope);
	}, [meContext.data.user?.permissions, permission]);

	const isActive = useIsActiveDomain(href) && !isDisabled;

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<a
				className={styles.icon}
				data-active={isActive}
				data-disabled={isDisabled}
				href={href}
			>
				{_id === 'alerts' && <IconAlertTriangle />}
				{_id === 'auth' && <IconUser />}
				{_id === 'controller' && <IconChartArrowsVertical />}
				{_id === 'equipments' && <IconDeviceMobile />}
				{_id === 'pulse' && <IconListCheck />}
				{_id === 'stops' && <IconBusStop />}
			</a>
			<span className={styles.tooltip}>
				{label}
			</span>
		</div>
	);

	//
}
