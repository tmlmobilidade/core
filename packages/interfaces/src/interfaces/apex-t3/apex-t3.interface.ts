/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexT3 } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexT3Class extends MongoCollectionClass<ApexT3, ApexT3, ApexT3> {
	private static _instance: ApexT3Class;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexT3Class._instance) {
			const instance = new ApexT3Class();
			await instance.connect();
			ApexT3Class._instance = instance;
		}
		return ApexT3Class._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { created_at: 1 } },
			{ background: true, key: { received_at: 1 } },
			{ background: true, key: { card_serial_number: 1 } },
			{ background: true, key: { agency_id: 1 } },
			// eslint-disable-next-line perfectionist/sort-objects
			{ background: true, key: { trip_id: 1, created_at: 1 } },
			{ background: true, key: { agency_id: 1, created_at: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'apex_t3';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_T3';
	}
}

/* * */

export const apexT3 = AsyncSingletonProxy(ApexT3Class);
