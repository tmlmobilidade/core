/* * */

import { PlanPermissionSchema, ValidationPermissionSchema } from '@tmlmobilidade/types';

/* * */

export const ALLOW_ALL_FLAG = 'allow_all';

/* * */

export const Permissions = Object.freeze({
	agencies: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			toggle_lock: 'toggle_lock',
			update: 'update',
		},
		resources: {},
		scope: 'agencies',
	},
	alerts: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			toggle_lock: 'toggle_lock',
			update: 'update',
		},
		resources: {},
		scope: 'alerts',
	},
	home: {
		actions: {
			read_links: 'read_links',
			read_wiki: 'read_wiki',
		},
		resources: {},
		scope: 'home',
	},
	plans: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			read_controller: 'read_controller',
			read_pcgi_legacy: 'pcgi_legacy_read',
			toggle_lock: 'toggle_lock',
			update: 'update',
			update_controller: 'update_controller',
			update_feed_info_dates: 'update_feed_info_dates',
			update_pcgi_legacy: 'update_pcgi_legacy',
		},
		resources: PlanPermissionSchema.shape,
		scope: 'plans',
	},
	rides: {
		actions: {
			read: 'read',
			toggle_lock: 'toggle_lock',
			update: 'update',
		},
		resources: {},
		scope: 'rides',
	},
	roles: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'roles',
	},
	stops: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			toggle_lock: 'toggle_lock',
			update: 'update',
		},
		resources: {},
		scope: 'stops',
	},
	users: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'users',
	},
	validations: {
		actions: {
			create: 'create',
			read: 'read',
			request_approval: 'request_approval',
		},
		resources: ValidationPermissionSchema.shape,
		scope: 'validations',
	},
});
