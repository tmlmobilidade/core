'use client';

/* * */

import { useMeContext } from '@/contexts';
import { type Permission } from '@tmlmobilidade/types';
import { getPermission } from '@tmlmobilidade/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export interface SidebarItemProps {
	href: string
	icon: React.ReactNode
	label: string
	permission: Permission<unknown>
}

/* * */

export function SidebarItem({ href, icon, label, permission }: SidebarItemProps) {
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

	const isActive = useMemo(() => {
		// Skip if window is not defined
		if (typeof window === 'undefined') return false;
		// Skip if is disabled
		if (isDisabled) return false;
		// The current item is active if the current URL starts with the item href
		const currentUrl = window.location.href;
		if (currentUrl.startsWith(href)) return true;
		return false;
	}, [href, isDisabled]);

	//
	// C. Render components

	if (isDisabled) {
		return null;
	}

	return (
		<div className={styles.container}>
			<a
				className={styles.icon}
				data-active={isActive}
				data-disabled={isDisabled}
				href={href}
			>
				{icon}
			</a>
			<span className={styles.tooltip}>
				{label}
			</span>
		</div>
	);

	//
}
