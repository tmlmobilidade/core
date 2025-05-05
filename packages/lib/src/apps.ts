import { Permissions } from './permissions.js';

const isDevelopment = process.env.NODE_ENV === 'development';
const isStaging = process.env.NODE_ENV === 'staging';

export const apps = [
	{
		_id: 'alerts',
		href: isDevelopment ? 'http://localhost:51001' : isStaging ? 'https://staging.alerts.sae.carrismetropolitana.pt' : 'https://alerts.sae.carrismetropolitana.pt',
		label: 'Alertas',
		permission: { action: Permissions.alerts.actions.list, scope: Permissions.alerts.scope },
	},
	{
		_id: 'auth',
		href: isDevelopment ? 'http://localhost:51000' : isStaging ? 'https://staging.auth.sae.carrismetropolitana.pt' : 'https://auth.sae.carrismetropolitana.pt',
		label: 'Auth',
		permission: { action: Permissions.users.actions.list, scope: Permissions.users.scope },
	},
	{
		_id: 'controller',
		href: isDevelopment ? 'http://localhost:51002' : isStaging ? 'https://staging.controller.sae.carrismetropolitana.pt' : 'https://controller.sae.carrismetropolitana.pt',
		label: 'Monitorização',
		permission: { action: Permissions.rides.actions.list, scope: Permissions.rides.scope },
	},
	{
		_id: 'equipments',
		href: isDevelopment ? 'http://localhost:51005' : isStaging ? 'https://staging.equipments.sae.carrismetropolitana.pt' : 'https://equipments.sae.carrismetropolitana.pt',
		label: 'Equipamentos',
		permission: { action: Permissions.municipalities.actions.list, scope: Permissions.municipalities.scope },
	},
	{
		_id: 'stops',
		href: isDevelopment ? 'http://localhost:51003' : isStaging ? 'https://staging.stops.sae.carrismetropolitana.pt' : 'https://stops.sae.carrismetropolitana.pt',
		label: 'Paragens',
		permission: { action: Permissions.stops.actions.list, scope: Permissions.stops.scope },
	},
	{
		_id: 'plans',
		href: isDevelopment ? 'http://localhost:51004/plans' : isStaging ? 'https://staging.plans.sae.carrismetropolitana.pt/plans' : 'https://plans.sae.carrismetropolitana.pt/plans',
		label: 'Planos',
		permission: { action: Permissions.plans.actions.list, scope: Permissions.plans.scope },
	},
	{
		_id: 'validations',
		href: isDevelopment ? 'http://localhost:51004/validations' : isStaging ? 'https://staging.plans.sae.carrismetropolitana.pt/validations' : 'https://plans.sae.carrismetropolitana.pt/validations',
		label: 'Validações',
		permission: { action: Permissions.validations.actions.list, scope: Permissions.validations.scope },
	},
];
