/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateMunicipalityDto, MunicipalitiesClassClass, Municipality, MunicipalitySchema, UpdateMunicipalityDto, UpdateMunicipalitySchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, Sort } from 'mongodb';
import { z } from 'zod';

/* * */

class MunicipalitiesClass extends MongoCollectionClass<Municipality, CreateMunicipalityDto, UpdateMunicipalityDto> {
	private static _instance: MunicipalitiesClassClass;
	protected override createSchema: z.ZodSchema = MunicipalitySchema;
	protected override updateSchema: z.ZodSchema = UpdateMunicipalitySchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!MunicipalitiesClassClass._instance) {
			const instance = new MunicipalitiesClassClass();
			await instance.connect();
			MunicipalitiesClassClass._instance = instance;
		}
		return MunicipalitiesClassClass._instance;
	}

	/**
	 * Finds municipality documents by municipality ID with optional pagination and sorting.
	 *
	 * @param id - The municipality ID to search for
	 * @param perPage - Optional number of documents per page for pagination
	 * @param page - Optional page number for pagination
	 * @param sort - Optional sort specification
	 * @returns A promise that resolves to an array of matching stop documents
	 */
	async findByMunicipalityId(id: string, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find({ municipality_id: id } as Filter<Municipality>);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	/**
	 * Finds multiple municipality documents by their IDs.
	 *
	 * @param ids - Array of municipality IDs to search for
	 * @returns A promise that resolves to an array of matching municipality documents
	 */
	async findManyByIds(ids: string[]) {
		return this.mongoCollection.find({ _id: { $in: ids } } as Filter<Municipality>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'municipalitiies';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_MUNICIPALITIES';
	}
}

/* * */

export const municipalities = AsyncSingletonProxy(MunicipalitiesClass);
