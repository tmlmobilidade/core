/* * */

import { SidebarItem } from '@/components/layout/SidebarItem';
import { Spacer } from '@/components/layout/Spacer';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { IconAlertTriangle, IconBusStop, IconDeviceMobile, IconFileCertificate, IconFileCheck, IconListCheck, IconUser } from '@tabler/icons-react';
import { Permissions } from '@tmlmobilidade/lib';

import styles from './styles.module.css';

/* * */

export const sidebarApps = [
	{
		_id: 'alerts',
		href: process.env.APP_ALERTS_URL ? process.env.APP_ALERTS_URL : 'http://localhost:51001',
		icon: <IconAlertTriangle size={26} />,
		label: 'Alertas',
		permission: { action: Permissions.alerts.actions.list, scope: Permissions.alerts.scope },
	},
	{
		_id: 'auth',
		href: process.env.APP_AUTH_URL ? process.env.APP_AUTH_URL : 'http://localhost:51000',
		icon: <IconUser size={26} />,
		label: 'Auth',
		permission: { action: Permissions.users.actions.list, scope: Permissions.users.scope },
	},
	{
		_id: 'controller',
		href: process.env.APP_CONTROLLER_URL ? process.env.APP_CONTROLLER_URL : 'http://localhost:51002',
		icon: <IconListCheck size={26} />,
		label: 'Monitorização',
		permission: { action: Permissions.rides.actions.list, scope: Permissions.rides.scope },
	},
	{
		_id: 'equipments',
		href: process.env.APP_EQUIPMENTS_URL ? process.env.APP_EQUIPMENTS_URL : 'http://localhost:51005',
		icon: <IconDeviceMobile size={26} />,
		label: 'Equipamentos',
		permission: { action: Permissions.municipalities.actions.list, scope: Permissions.municipalities.scope },
	},
	{
		_id: 'stops',
		href: process.env.APP_STOPS_URL ? process.env.APP_STOPS_URL : 'http://localhost:51003',
		icon: <IconBusStop size={26} />,
		label: 'Paragens',
		permission: { action: Permissions.stops.actions.list, scope: Permissions.stops.scope },
	},
	{
		_id: 'plans',
		href: process.env.APP_PLANS_URL ? `${process.env.APP_PLANS_URL}/plans` : 'http://localhost:51004/plans',
		icon: <IconFileCertificate size={26} />,
		label: 'Planos',
		permission: { action: Permissions.plans.actions.list, scope: Permissions.plans.scope },
	},
	{
		_id: 'validations',
		href: process.env.APP_PLANS_URL ? `${process.env.APP_PLANS_URL}/validations` : 'http://localhost:51004/validations',
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
