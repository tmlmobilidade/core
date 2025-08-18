'use client';

/* * */

import { SidebarItem } from '@/components/sidebar/SidebarItem';
import { IconAlertTriangle, IconBuildings, IconBusStop, IconDeviceSim, IconFileCertificate, IconFileCheck, IconHome, IconKey, IconListCheck, IconUser } from '@tabler/icons-react';
import { getAppConfig, Permissions } from '@tmlmobilidade/lib';

import styles from './styles.module.css';

/* * */

export const sidebarApps = [
	{
		_id: 'home',
		href: `${getAppConfig('auth', 'frontend_url')}/home`,
		icon: <IconHome size={26} />,
		label: 'Home',
		permission: { action: Permissions.agencies.actions.read, scope: Permissions.agencies.scope },
	},
	{
		_id: 'users',
		href: `${getAppConfig('auth', 'frontend_url')}/users`,
		icon: <IconUser size={26} />,
		label: 'Utilizadores',
		permission: { action: Permissions.users.actions.read, scope: Permissions.users.scope },
	},
	{
		_id: 'roles',
		href: `${getAppConfig('auth', 'frontend_url')}/roles`,
		icon: <IconKey size={26} />,
		label: 'Grupos de Permissões',
		permission: { action: Permissions.roles.actions.read, scope: Permissions.roles.scope },
	},
	{
		_id: 'agencies',
		href: `${getAppConfig('auth', 'frontend_url')}/agencies`,
		icon: <IconBuildings size={26} />,
		label: 'Operadores',
		permission: { action: Permissions.agencies.actions.read, scope: Permissions.agencies.scope },
	},
	{
		_id: 'alerts',
		href: `${getAppConfig('alerts', 'frontend_url')}/alerts`,
		icon: <IconAlertTriangle size={26} />,
		label: 'Alertas',
		permission: { action: Permissions.alerts.actions.read, scope: Permissions.alerts.scope },
	},
	{
		_id: 'rides',
		href: `${getAppConfig('controller', 'frontend_url')}/rides`,
		icon: <IconListCheck size={26} />,
		label: 'Circulações',
		permission: { action: Permissions.rides.actions.read, scope: Permissions.rides.scope },
	},
	{
		_id: 'sams',
		href: `${getAppConfig('controller', 'frontend_url')}/sams`,
		icon: <IconDeviceSim size={26} />,
		label: 'SAMS',
		permission: { action: Permissions.rides.actions.read, scope: Permissions.rides.scope },
	},
	{
		_id: 'stops',
		href: getAppConfig('stops', 'frontend_url'),
		icon: <IconBusStop size={26} />,
		label: 'Paragens',
		permission: { action: Permissions.stops.actions.read, scope: Permissions.stops.scope },
	},
	{
		_id: 'plans',
		href: `${getAppConfig('plans', 'frontend_url')}/plans`,
		icon: <IconFileCertificate size={26} />,
		label: 'Planos',
		permission: { action: Permissions.plans.actions.read, scope: Permissions.plans.scope },
	},
	{
		_id: 'validations',
		href: `${getAppConfig('plans', 'frontend_url')}/validations`,
		icon: <IconFileCheck size={26} />,
		label: 'Validações GTFS',
		permission: { action: Permissions.validations.actions.read, scope: Permissions.validations.scope },
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
			</div>
		</div>
	);
}
