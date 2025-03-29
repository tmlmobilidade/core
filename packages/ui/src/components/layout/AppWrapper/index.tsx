'use client';

/* * */

import { useMeContext } from '@/contexts/Me.context';

import Sidebar from '../Sidebar';
import Header from './Header';
import styles from './styles.module.css';

/* * */

export interface AppWrapperProps {
	children: React.ReactNode
	icon?: React.ReactNode | { href: string, icon: React.ReactNode }
}

/* * */

export default function AppWrapper({ children, icon }: AppWrapperProps) {
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
			<Header userName={meContext.data.user?.first_name} />
			<Sidebar />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
