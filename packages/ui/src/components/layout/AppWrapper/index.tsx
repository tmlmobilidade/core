'use client';

/* * */

import { AppWrapperHeader } from '@/components/layout/AppWrapperHeader';
import { Sidebar } from '@/components/layout/Sidebar';
import { useMeContext } from '@/contexts/Me.context';

import styles from './styles.module.css';

/* * */

interface Props {
	children: React.ReactNode
	icon?: React.ReactNode | { href: string, icon: React.ReactNode }
}

/* * */

export function AppWrapper({ children, icon }: Props) {
	//
	// A. Setup variables

	const meContext = useMeContext();

	const appIcon = () => {
		if (icon && typeof icon === 'object' && 'href' in icon) {
			return <a href={icon.href}>{icon.icon}</a>;
		}

		return icon;
	};

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<div className={styles.appIcon}>{appIcon()}</div>
			<AppWrapperHeader userName={meContext.data.user?.first_name} />
			<Sidebar />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
