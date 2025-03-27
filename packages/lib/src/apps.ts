import { Permissions } from '@/permissions.js';

const isDevelopment = process.env.NODE_ENV === 'development';

export const apps = [
	{
		_id: 'alerts',
		href: isDevelopment ? 'http://localhost:51001' : 'https://alerts.sae.carrismetropolitana.pt',
		label: 'Alertas',
		permission: { action: Permissions.alerts.actions.list, scope: Permissions.alerts.scope },
	},
	{
		_id: 'auth',
		href: isDevelopment ? 'http://localhost:51000' : 'https://auth.sae.carrismetropolitana.pt',
		label: 'Auth',
		permission: { action: Permissions.users.actions.list, scope: Permissions.users.scope },
	},
	{
		_id: 'controller',
		href: isDevelopment ? 'http://localhost:51002' : 'https://controller.sae.carrismetropolitana.pt',
		label: 'Monitorização',
		permission: { action: Permissions.rides.actions.list, scope: Permissions.rides.scope },
	},
	{
		_id: 'equipments',
		href: isDevelopment ? 'http://localhost:51005' : 'https://equipments.sae.carrismetropolitana.pt',
		label: 'Equipamentos',
		permission: { action: Permissions.municipalities.actions.list, scope: Permissions.municipalities.scope },
	},
	{
		_id: 'pulse',
		href: isDevelopment ? 'http://localhost:51003' : 'https://pulse.sae.carrismetropolitana.pt',
		label: 'Performance',
		permission: { action: Permissions.rides.actions.list, scope: Permissions.rides.scope },
	},
	{
		_id: 'stops',
		href: isDevelopment ? 'http://localhost:51004' : 'https://stops.sae.carrismetropolitana.pt',
		label: 'Paragens',
		permission: { action: Permissions.stops.actions.list, scope: Permissions.stops.scope },
	},
];
