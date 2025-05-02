/* * */

import { SidebarItem } from '@/components/layout/SidebarItem';
import { SidebarSubItem, type SidebarSubItemProps } from '@/components/layout/SidebarSubItem';
import { Spacer } from '@/components/layout/Spacer';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { apps } from '@tmlmobilidade/lib';

import styles from './styles.module.css';

/* * */

export function Sidebar({ submenu }: { submenu?: SidebarSubItemProps[] }) {
	return (
		<div className={styles.sidebarWrapper}>
			<div className={styles.container}>
				<div className={styles.navWrapper}>
					{apps.map(item => (
						<SidebarItem
							key={item.href}
							_id={item._id}
							href={item.href}
							label={item.label}
							permission={item.permission}
						/>
					))}
				</div>
				<Spacer orientation="vertical" />
				<div className={styles.navWrapper}>
					<ThemeSwitcher />
				</div>
			</div>
			<div className={styles.container}>
				{submenu && (
					<div className={styles.navWrapper}>
						{submenu.map(item => (
							<SidebarSubItem
								key={item._id}
								_id={item._id}
								href={item.href}
								icon={item.icon}
								label={item.label}
								permission={item.permission}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
