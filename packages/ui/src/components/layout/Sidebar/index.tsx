/* * */

import { SidebarItem } from '@/components/layout/SidebarItem';
import { Spacer } from '@/components/layout/Spacer';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { apps } from '@tmlmobilidade/lib';

import styles from './styles.module.css';

/* * */

export function Sidebar() {
	return (
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
	);
}
