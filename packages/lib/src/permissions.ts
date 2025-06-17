import { PlanPermissionSchema } from '@tmlmobilidade/types';

export const Permissions = Object.freeze({
	agencies: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'agencies',
	},
	alerts: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'alerts',
	},
	files: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'files',
	},
	hashedShapes: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'hashedShapes',
	},
	hashedTrips: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'hashedTrips',
	},
	municipalities: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'municipalities',
	},
	organizations: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'organizations',
	},
	plans: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: PlanPermissionSchema.shape,
		scope: 'plans',
	},
	rides: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'rides',
	},
	roles: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'roles',
	},
	sessions: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'sessions',
	},
	stops: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'stops',
	},
	users: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'users',
	},
	validations: {
		actions: {
			create: 'create',
			delete: 'delete',
			list: 'list',
			read: 'read',
			update: 'update',
		},
		resources: {},
		scope: 'validations',
	},
});
