/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexOnBoardRefund } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexOnBoardRefundsClass extends MongoCollectionClass<ApexOnBoardRefund, ApexOnBoardRefund, ApexOnBoardRefund> {
	private static _instance: ApexOnBoardRefundsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexOnBoardRefundsClass._instance) {
			const instance = new ApexOnBoardRefundsClass();
			await instance.connect();
			ApexOnBoardRefundsClass._instance = instance;
		}
		return ApexOnBoardRefundsClass._instance;
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
		return 'apex_on_board_refunds';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_ON_BOARD_REFUNDS';
	}
}

/* * */

export const apexOnBoardRefunds = AsyncSingletonProxy(ApexOnBoardRefundsClass);
