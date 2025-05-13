/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexInspectionDecision } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexInspectionDecisionsClass extends MongoCollectionClass<ApexInspectionDecision, ApexInspectionDecision, ApexInspectionDecision> {
	private static _instance: ApexInspectionDecisionsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexInspectionDecisionsClass._instance) {
			const instance = new ApexInspectionDecisionsClass();
			await instance.connect();
			ApexInspectionDecisionsClass._instance = instance;
		}
		return ApexInspectionDecisionsClass._instance;
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
		return 'apex_inspection_decisions';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_INSPECTION_DECISIONS';
	}
}

/* * */

export const apexInspectionDecisions = AsyncSingletonProxy(ApexInspectionDecisionsClass);
