/* * */

import { AlertPermissionSchema, GtfsValidationPermissionSchema, PlanPermissionSchema, RidePermissionSchema } from '@tmlmobilidade/types';

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
			analsys_lock: 'analsys_lock',
			analysis_lock: 'analysis_lock',
			analysis_read: 'analysis_read',
			analysis_reprocess: 'analysis_reprocess',
			analysis_update: 'analysis_update',
			audit_lock: 'audit_lock',
			audit_read: 'audit_read',
			audit_update: 'audit_update',
			justification_change_status: 'justification_change_status',
			justification_justify: 'justification_justify',
			justification_lock: 'justification_lock',
			justification_read: 'justification_read',
		},
		resources: RidePermissionSchema.shape,
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
