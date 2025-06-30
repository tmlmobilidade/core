'use client';

/* * */

import { SidebarItem } from '@/components/layout/SidebarItem';
import { Spacer } from '@/components/layout/Spacer';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { IconAlertTriangle, IconBusStop, IconFileCertificate, IconFileCheck, IconListCheck, IconUser } from '@tabler/icons-react';
import { getAppConfig, Permissions } from '@tmlmobilidade/lib';

import styles from './styles.module.css';

/* * */

export const sidebarApps = [
	{
		_id: 'auth',
		href: getAppConfig('auth', 'frontend_url'),
		icon: <IconUser size={26} />,
		label: 'Auth',
		permission: { action: Permissions.users.actions.list, scope: Permissions.users.scope },
	},
	{
		_id: 'alerts',
		href: getAppConfig('alerts', 'frontend_url'),
		icon: <IconAlertTriangle size={26} />,
		label: 'Alertas',
		permission: { action: Permissions.alerts.actions.list, scope: Permissions.alerts.scope },
	},
	{
		_id: 'rides',
		href: getAppConfig('rides', 'frontend_url'),
		icon: <IconListCheck size={26} />,
		label: 'Monitorização',
		permission: { action: Permissions.rides.actions.list, scope: Permissions.rides.scope },
	},
	{
		_id: 'stops',
		href: getAppConfig('stops', 'frontend_url'),
		icon: <IconBusStop size={26} />,
		label: 'Paragens',
		permission: { action: Permissions.stops.actions.list, scope: Permissions.stops.scope },
	},
	{
		_id: 'plans',
		href: `${getAppConfig('plans', 'frontend_url')}/plans`,
		icon: <IconFileCertificate size={26} />,
		label: 'Planos',
		permission: { action: Permissions.plans.actions.list, scope: Permissions.plans.scope },
	},
	{
		_id: 'validations',
		href: `${getAppConfig('plans', 'frontend_url')}/validations`,
		icon: <IconFileCheck size={26} />,
		label: 'Validações',
		permission: { action: Permissions.validations.actions.list, scope: Permissions.validations.scope },
	},
];

/* * */

export function Sidebar() {
	return (
		<div className={styles.sidebarWrapper}>
			<div className={styles.container}>
				<div className={styles.navWrapper}>
					{sidebarApps.map(item => (
						<SidebarItem
							key={item.href}
							href={item.href}
							icon={item.icon}
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
		</div>
	);
}
