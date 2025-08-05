db.createUser({
	pwd: USER_AUTH_PASSWORD,
	roles: [{ db: 'production', role: 'auth' }],
	user: 'auth',
});

db.createUser({
	pwd: USER_PLANS_PASSWORD,
	roles: [{ db: 'production', role: 'plans' }],
	user: 'plans',
});

db.createUser({
	pwd: USER_ALERTS_PASSWORD,
	roles: [{ db: 'production', role: 'alerts' }],
	user: 'alerts',
});

db.createUser({
	pwd: USER_STOPS_PASSWORD,
	roles: [{ db: 'production', role: 'stops' }],
	user: 'stops',
});

db.createUser({
	pwd: USER_LOCATIONS_PASSWORD,
	roles: [{ db: 'production', role: 'locations' }],
	user: 'locations',
});
