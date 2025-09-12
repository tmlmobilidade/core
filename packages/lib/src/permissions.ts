/* * */

import { AlertPermissionSchema, GtfsValidationPermissionSchema, PlanPermissionSchema } from '@tmlmobilidade/types';

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
	alerts_realtime: {
		actions: {
			create: 'create',
			delete: 'delete',
			read: 'read',
			toggle_lock: 'toggle_lock',
			update: 'update',
		},
		resources: AlertPermissionSchema.shape,
		scope: 'alerts_realtime',
	},
	home: {
		actions: {
			read_links: 'read_links',
			read_wiki: 'read_wiki',
		},
		resources: {},
		scope: 'home',
	},
	organizations: {
		actions: {
			read: 'read',
		},
		scope: 'organizations',
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
			update_gtfs_plan: 'update_gtfs_plan',
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
		resources: GtfsValidationPermissionSchema.shape,
		scope: 'validations',
	},
});
