import { MongoConnector } from '@/connectors/mongo.connector';
import { Db } from 'mongodb';
import { MongoMemoryServer } from 'mongodb-memory-server';

import { mockAgencies, mockAlerts, mockMunicipalities, mockOrganizations, mockPermissions, mockRoles, mockStops, mockUsers, mockZones } from './data/db-mock';

let mongoServer: MongoMemoryServer;
let db: Db;
let mongoConnector: MongoConnector;

beforeAll(async () => {
	// Start In-Memory MongoDB Server
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	// Override environment variable for MongoDB URI
	process.env.TML_INTERFACE_AUTH = uri;
	process.env.TML_INTERFACE_STOPS = uri;
	process.env.TML_INTERFACE_MUNICIPALITIES = uri;
	process.env.TML_INTERFACE_ORGANIZATIONS = uri;
	process.env.TML_INTERFACE_AGENCIES = uri;
	process.env.TML_INTERFACE_ZONES = uri;
	process.env.TML_INTERFACE_RIDES = uri;
	process.env.TML_INTERFACE_ALERTS = uri;
	process.env.TML_INTERFACE_HASHED_TRIPS = uri;
	process.env.TML_INTERFACE_HASHED_SHAPES = uri;
	process.env.TML_INTERFACE_VEHICLE_EVENTS = uri;
	process.env.TML_INTERFACE_APEX_T3 = uri;
	process.env.TML_INTERFACE_APEX_T11 = uri;
	process.env.TML_INTERFACE_APEX_T19 = uri;
	process.env.TML_INTERFACE_PLANS = uri;
	// Initialize MongoConnector
	mongoConnector = new MongoConnector(uri);
	await mongoConnector.connect();
	db = mongoConnector.db('production');

	// Seed Collections with Mock Data
	await seedDatabase(db);
});

afterAll(async () => {
	// Close MongoDB connection and stop server
	if (mongoConnector) {
		await mongoConnector.disconnect();
	}
	if (mongoServer) {
		await mongoServer.stop();
	}
});

/**
    * Seeds the database with mock data.
    * @param db - The MongoDB database instance.
    */
export async function seedDatabase(db: Db) {
	const collections = [
		{ data: mockPermissions, name: 'permissions' },
		{ data: mockRoles, name: 'roles' },
		{ data: mockUsers, name: 'users' },
		{ data: mockZones, name: 'zones' },
		{ data: mockStops, name: 'stops' }, // TODO - Allow _id that are strings (not ObjectIds)
		{ data: mockOrganizations, name: 'organizations' },
		{ data: mockMunicipalities, name: 'municipalities' },
		{ data: mockAgencies, name: 'agencies' },
		{ data: mockAlerts, name: 'alerts' },
	];

	for (const collection of collections) {
		for (const item of collection.data) {
			await db.collection(collection.name).insertOne(item as any);
		}
	}
}
