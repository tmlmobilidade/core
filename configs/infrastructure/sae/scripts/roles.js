db.createRole({
	privileges: [
		{ actions: ['find'], resource: { collection: 'agencies', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'users', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'sessions', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'roles', db: 'production' } },
		{ actions: ['find', 'insert', 'update', 'remove'], resource: { collection: 'files', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'census', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'districts', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'localities', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'municipalities', db: 'production' } },
		{ actions: ['find'], resource: { collection: 'parishes', db: 'production' } },
	],
	role: 'common',
	roles: [],
});

db.createRole({
	privileges: [
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'plans', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'gtfs_validations', db: 'production' } },
	],
	role: 'plans',
	roles: [{
		db: 'admin',
		role: 'common',
	}],
});

db.createRole({
	privileges: [
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'alerts', db: 'production' } }],
	role: 'alerts',
	roles: [{
		db: 'admin',
		role: 'common',
	}],
});

db.createRole({
	privileges: [
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'stops', db: 'production' } }],
	role: 'stops',
	roles: [{
		db: 'admin',
		role: 'common',
	}],
});

db.createRole({
	privileges: [
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'agencies', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'users', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'sessions', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'roles', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'files', db: 'production' } },
	],
	role: 'auth',
	roles: [{
		db: 'admin',
		role: 'common',
	}],
});

db.createRole({
	privileges: [
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'census', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'districts', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'localities', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'municipalities', db: 'production' } },
		{ actions: ['find', 'update', 'insert', 'remove'], resource: { collection: 'parishes', db: 'production' } },
	],
	role: 'locations',
	roles: [],
});
