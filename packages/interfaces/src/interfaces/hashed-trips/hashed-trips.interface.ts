/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateHashedTripDto, HashedTrip, UpdateHashedTripDto } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class HashedTripsClass extends MongoCollectionClass<HashedTrip, CreateHashedTripDto, UpdateHashedTripDto> {
	private static _instance: HashedTripsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!HashedTripsClass._instance) {
			const instance = new HashedTripsClass();
			await instance.connect();
			HashedTripsClass._instance = instance;
		}
		return HashedTripsClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { agency_id: 1 } },
			{ background: true, key: { line_id: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'hashed_trips';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_HASHED_TRIPS';
	}
}

/* * */

export const hashedTrips = AsyncSingletonProxy(HashedTripsClass);
