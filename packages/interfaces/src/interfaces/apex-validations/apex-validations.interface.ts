/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexValidation } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexValidationsClass extends MongoCollectionClass<ApexValidation, ApexValidation, ApexValidation> {
	private static _instance: ApexValidationsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexValidationsClass._instance) {
			const instance = new ApexValidationsClass();
			await instance.connect();
			ApexValidationsClass._instance = instance;
		}
		return ApexValidationsClass._instance;
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
		return 'apex_validations';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_VALIDATIONS';
	}
}

/* * */

export const apexValidations = AsyncSingletonProxy(ApexValidationsClass);
