db.createUser({
	pwd: USER_AUTH_PASSWORD,
	roles: [{ db: 'admin', role: 'auth' }],
	user: 'auth',
});

db.createUser({
	pwd: USER_PLANS_PASSWORD,
	roles: [{ db: 'admin', role: 'plans' }],
	user: 'plans',
});

db.createUser({
	pwd: USER_ALERTS_PASSWORD,
	roles: [{ db: 'admin', role: 'alerts' }],
	user: 'alerts',
});

db.createUser({
	pwd: USER_STOPS_PASSWORD,
	roles: [{ db: 'admin', role: 'stops' }],
	user: 'stops',
});

db.createUser({
	pwd: USER_LOCATIONS_PASSWORD,
	roles: [{ db: 'admin', role: 'locations' }],
	user: 'locations',
});

db.createUser({
	pwd: USER_CONTROLLER_PASSWORD,
	roles: [{ db: 'admin', role: 'controller' }],
	user: 'controller',
});
