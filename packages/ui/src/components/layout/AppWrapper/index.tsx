'use client';

/* * */

import Sidebar, { SidebarItemProps } from '../Sidebar';
import Header from './Header';
import styles from './styles.module.css';

/* * */

export interface HeaderProps {
	user_name?: string
}

export interface AppWrapperProps {
	children: React.ReactNode
	headerProps?: HeaderProps
	icon: React.ReactNode | { href: string, icon: React.ReactNode }
	sidebarItems: SidebarItemProps[]
}

export default function AppWrapper({
	children,
	headerProps,
	icon,
	sidebarItems,
}: AppWrapperProps) {
	const appIcon = () => {
		if (icon && typeof icon === 'object' && 'href' in icon) {
			return <a href={icon.href}>{icon.icon}</a>;
		}

		return icon;
	};

	return (
		<div className={styles.container}>
			<div className={styles.appIcon}>{appIcon()}</div>
			<Header {...headerProps} />
			<Sidebar items={sidebarItems} />
			<div className={styles.content}>{children}</div>
		</div>
	);
}
