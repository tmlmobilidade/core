/* * */

import { MongoCollectionClass } from '@tmlmobilidade/lib';
import { CreatePlanDto, Plan, UpdatePlanDto } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';

/* * */

class PlansClass extends MongoCollectionClass<Plan, CreatePlanDto, UpdatePlanDto> {
	private static _instance: PlansClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!PlansClass._instance) {
			const instance = new PlansClass();
			await instance.connect();
			PlansClass._instance = instance;
		}
		return PlansClass._instance;
	}

	/**
	 * Finds Plan documents by agency ID.
	 *
	 * @param id - The agency ID to search for
	 * @returns A promise that resolves to an array of matching documents
	 */
	async findByAgencyId(id: string) {
		return this.mongoCollection.find({ agency_id: id } as Filter<Plan>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [];
	}

	protected getCollectionName(): string {
		return 'plans';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_PLANS';
	}
}

/* * */

export const plans = AsyncSingletonProxy(PlansClass);
