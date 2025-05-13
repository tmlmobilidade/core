/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { ApexOnBoardSale } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';

/* * */

class ApexOnBoardSalesClass extends MongoCollectionClass<ApexOnBoardSale, ApexOnBoardSale, ApexOnBoardSale> {
	private static _instance: ApexOnBoardSalesClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ApexOnBoardSalesClass._instance) {
			const instance = new ApexOnBoardSalesClass();
			await instance.connect();
			ApexOnBoardSalesClass._instance = instance;
		}
		return ApexOnBoardSalesClass._instance;
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
		return 'apex_on_board_sales';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_APEX_ON_BOARD_SALES';
	}
}

/* * */

export const apexOnBoardSales = AsyncSingletonProxy(ApexOnBoardSalesClass);
