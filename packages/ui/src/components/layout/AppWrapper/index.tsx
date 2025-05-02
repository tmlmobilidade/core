'use client';

/* * */

import { SidebarSubItemProps } from '@/components';
import { AppWrapperHeader } from '@/components/layout/AppWrapperHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { useMeContext } from '@/contexts/Me.context';
import { type PropsWithChildren } from 'react';

import styles from './styles.module.css';

/* * */

export function AppWrapper({ children, submenu }: PropsWithChildren<{ submenu?: SidebarSubItemProps[] }>) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.appLogo} />
			<AppWrapperHeader userName={meContext.data.user?.first_name} />
			<Sidebar submenu={submenu} />
			<div className={styles.content}>{children}</div>
		</div>
	);

	//
}
