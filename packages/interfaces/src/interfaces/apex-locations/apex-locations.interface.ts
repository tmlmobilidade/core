/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexLocation } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexLocationsClass extends MongoCollectionClass<ApexLocation, ApexLocation, ApexLocation> {
	private static _instance: ApexLocationsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexLocationsClass._instance) {
			const instance = new ApexLocationsClass();
			await instance.connect();
			ApexLocationsClass._instance = instance;
		}
		return ApexLocationsClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { created_at: 1 } },
			{ background: true, key: { received_at: 1 } },
			{ background: true, key: { agency_id: 1 } },
			// eslint-disable-next-line perfectionist/sort-objects
			{ background: true, key: { trip_id: 1, created_at: 1 } },
			{ background: true, key: { agency_id: 1, created_at: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'apex_locations';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_LOCATIONS';
	}
}

/* * */

export const apexLocations = AsyncSingletonProxy(ApexLocationsClass);
