/* * */

import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { CreateStopDto, Stop, UpdateStopDto } from '@/interfaces/stops/stop.type';
import { AsyncSingletonProxy } from '@/lib/utils';
import { Filter, IndexDescription, Sort } from 'mongodb';

/* * */

class StopsClass extends MongoCollectionClass<Stop, CreateStopDto, UpdateStopDto> {
	private static _instance: StopsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!StopsClass._instance) {
			const instance = new StopsClass();
			await instance.connect();
			StopsClass._instance = instance;
		}
		return StopsClass._instance;
	}

	/**
	 * Finds stop documents by municipality ID with optional pagination and sorting.
	 *
	 * @param id - The municipality ID to search for
	 * @param perPage - Optional number of documents per page for pagination
	 * @param page - Optional page number for pagination
	 * @param sort - Optional sort specification
	 * @returns A promise that resolves to an array of matching stop documents
	 */
	async findByMunicipalityId(id: string, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find({ municipality_id: id } as Filter<Stop>);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	/**
	 * Finds multiple stop documents by their IDs.
	 *
	 * @param ids - Array of stop IDs to search for
	 * @returns A promise that resolves to an array of matching stop documents
	 */
	async findManyByIds(ids: string[]) {
		return this.mongoCollection.find({ _id: { $in: ids } } as Filter<Stop>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'stops';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_STOPS';
	}
}

/* * */

export const stops = AsyncSingletonProxy(StopsClass);
