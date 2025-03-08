/* * */

import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { ApexT11 } from '@/interfaces/apex-t11/apex-t11.type';
import { AsyncSingletonProxy } from '@/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexT11Class extends MongoCollectionClass<ApexT11, ApexT11, ApexT11> {
	private static _instance: ApexT11Class;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexT11Class._instance) {
			const instance = new ApexT11Class();
			await instance.connect();
			ApexT11Class._instance = instance;
		}
		return ApexT11Class._instance;
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
		return 'apex_t11';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_T11';
	}
}

/* * */

export const apexT11 = AsyncSingletonProxy(ApexT11Class);
