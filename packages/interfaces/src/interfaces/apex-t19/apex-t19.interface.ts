/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexT19 } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexT19Class extends MongoCollectionClass<ApexT19, ApexT19, ApexT19> {
	private static _instance: ApexT19Class;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexT19Class._instance) {
			const instance = new ApexT19Class();
			await instance.connect();
			ApexT19Class._instance = instance;
		}
		return ApexT19Class._instance;
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
		return 'apex_t19';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_T19';
	}
}

/* * */

export const apexT19 = AsyncSingletonProxy(ApexT19Class);
