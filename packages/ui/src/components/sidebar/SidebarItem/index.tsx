'use client';

/* * */

import { SidebarItemTooltip } from '@/components/sidebar/SidebarItemTooltip';
import { useMeContext } from '@/contexts/Me.context';
import { useCurrentUrl } from '@/hooks';
import { type Permission } from '@tmlmobilidade/types';
import { getPermission } from '@tmlmobilidade/utils';
import { useMemo, useRef, useState } from 'react';

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

	const currentUrl = useCurrentUrl();

	const ref = useRef<HTMLAnchorElement>(null);
	const [hover, setHover] = useState(false);

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
		// The current item is active if the
		// current URL starts with the item href
		if (currentUrl?.startsWith(href)) return true;
		return false;
	}, [href, isDisabled, currentUrl]);

	const hrefValue = useMemo(() => {
		// Skip if item is disabled
		if (isDisabled) return;
		// Skip if item is active
		if (isActive) return;
		// Return the href value
		return href;
	}, [isDisabled, isActive, href]);

	//
	// C. Render components

	if (isDisabled) {
		return null;
	}

	return (
		<>
			<a
				ref={ref}
				className={styles.icon}
				data-active={isActive}
				data-disabled={isDisabled}
				href={hrefValue}
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{icon}
			</a>
			{hover && (
				<SidebarItemTooltip
					label={label}
					target={ref.current}
				/>
			)}
		</>
	);

	//
}
