'use client';

/* * */

import { useMeContext } from '@/contexts';
import { useIsActivePage } from '@/hooks';
import { Permission } from '@tmlmobilidade/types';
import { getPermission } from '@tmlmobilidade/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export interface SidebarSubItemProps {
	_id: string
	href: string
	icon: React.ReactNode
	label: string
	permission: Permission<unknown>
}

/* * */

export function SidebarSubItem({ href, icon, label, permission }: SidebarSubItemProps) {
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

	const isActive = useIsActivePage(href) && !isDisabled;

	//
	// C. Render components

	return (
		<a
			className={styles.container}
			data-active={isActive}
			data-disabled={isDisabled}
			href={href}
		>
			<div className={styles.icon}>
				{icon}
			</div>
			<span className={styles.label}>
				{label}
			</span>
		</a>
	);

	//
}
