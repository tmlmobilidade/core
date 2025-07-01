/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateParishDto, Parish, ParishSchema, UpdateParishDto, UpdateParishSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, Sort } from 'mongodb';
import { z } from 'zod';

/* * */

class ParishesClass extends MongoCollectionClass<Parish, CreateParishDto, UpdateParishDto> {
	private static _instance: ParishesClass;
	protected override createSchema: z.ZodSchema = ParishSchema;
	protected override updateSchema: z.ZodSchema = UpdateParishSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ParishesClass._instance) {
			const instance = new ParishesClass();
			await instance.connect();
			ParishesClass._instance = instance;
		}
		return ParishesClass._instance;
	}

	/**
     * Finds parish documents by municipality ID with optional pagination and sorting.
     *
     * @param id - The municipality ID to search for
     * @param perPage - Optional number of documents per page for pagination
     * @param page - Optional page number for pagination
     * @param sort - Optional sort specification
     * @returns A promise that resolves to an array of matching parish documents
     */
	async findByParishId(id: string, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find({ parish_id: id } as Filter<Parish>);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	/**
     * Finds multiple parish documents by their IDs.
     *
     * @param ids - Array of parish IDs to search for
     * @returns A promise that resolves to an array of matching parish documents
     */
	async findManyByIds(ids: string[]) {
		return this.mongoCollection.find({ _id: { $in: ids } } as Filter<Parish>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'parishes';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_PARISHES';
	}
}

/* * */

export const parishes = AsyncSingletonProxy(ParishesClass);
