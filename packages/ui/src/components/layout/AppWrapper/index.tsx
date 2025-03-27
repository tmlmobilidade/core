'use client';

import { useMeContext } from '@/contexts/Me.context';
/* * */

import Sidebar from '../Sidebar';
import Header from './Header';
import styles from './styles.module.css';

/* * */

export interface HeaderProps {
	user_name?: string
}

export interface AppWrapperProps {
	children: React.ReactNode
	headerProps?: HeaderProps
	icon?: React.ReactNode | { href: string, icon: React.ReactNode }
}

/* * */

export default function AppWrapper({ children, headerProps, icon }: AppWrapperProps) {
	//
	// A. Setup variables

	const { data: { sidebar } } = useMeContext();

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
			<Header {...headerProps} />
			<Sidebar items={sidebar} />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
