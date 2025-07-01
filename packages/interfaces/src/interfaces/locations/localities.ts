/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateLocalityDto, Locality, LocalitySchema, UpdateLocalityDto, UpdateLocalitySchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, Sort } from 'mongodb';
import { z } from 'zod';

/* * */

class LocalitiesClass extends MongoCollectionClass<Locality, CreateLocalityDto, UpdateLocalityDto> {
	private static _instance: LocalitiesClass;
	protected override createSchema: z.ZodSchema = LocalitySchema;
	protected override updateSchema: z.ZodSchema = UpdateLocalitySchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!LocalitiesClass._instance) {
			const instance = new LocalitiesClass();
			await instance.connect();
			LocalitiesClass._instance = instance;
		}
		return LocalitiesClass._instance;
	}

	/**
     * Finds locality documents by municipality ID with optional pagination and sorting.
     *
     * @param id - The municipality ID to search for
     * @param perPage - Optional number of documents per page for pagination
     * @param page - Optional page number for pagination
     * @param sort - Optional sort specification
     * @returns A promise that resolves to an array of matching locality documents
     */
	async findByLocalityId(id: string, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find({ locality_id: id } as Filter<Locality>);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	/**
     * Finds multiple locality documents by their IDs.
     *
     * @param ids - Array of locality IDs to search for
     * @returns A promise that resolves to an array of matching locality documents
     */
	async findManyByIds(ids: string[]) {
		return this.mongoCollection.find({ _id: { $in: ids } } as Filter<Locality>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'localities';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_LOCALITIES';
	}
}

/* * */

export const localities = AsyncSingletonProxy(LocalitiesClass);
