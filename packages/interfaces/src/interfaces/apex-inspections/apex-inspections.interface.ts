/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexInspection } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexInspectionsClass extends MongoCollectionClass<ApexInspection, ApexInspection, ApexInspection> {
	private static _instance: ApexInspectionsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexInspectionsClass._instance) {
			const instance = new ApexInspectionsClass();
			await instance.connect();
			ApexInspectionsClass._instance = instance;
		}
		return ApexInspectionsClass._instance;
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
		return 'apex_inspections';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_INSPECTIONS';
	}
}

/* * */

export const apexInspections = AsyncSingletonProxy(ApexInspectionsClass);
