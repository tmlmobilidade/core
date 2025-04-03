/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateMunicipalityDto, Municipality, MunicipalitySchema, UpdateMunicipalityDto, UpdateMunicipalitySchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class MunicipalitiesClass extends MongoCollectionClass<Municipality, CreateMunicipalityDto, UpdateMunicipalityDto> {
	private static _instance: MunicipalitiesClass;
	protected override createSchema: z.ZodSchema = MunicipalitySchema;
	protected override updateSchema: z.ZodSchema = UpdateMunicipalitySchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!MunicipalitiesClass._instance) {
			const instance = new MunicipalitiesClass();
			await instance.connect();
			MunicipalitiesClass._instance = instance;
		}
		return MunicipalitiesClass._instance;
	}

	/**
	 * Finds a municipality by its code
	 *
	 * @param code - The code of the municipality to find
	 * @returns A promise that resolves to the matching municipality document or null if not found
	 */
	async findByCode(code: string) {
		return this.mongoCollection.findOne({ code } as Filter<Municipality>);
	}

	/**
	 * Updates a municipality by its code
	 *
	 * @param code - The code of the municipality to update
	 * @param fields - The fields to update
	 * @returns A promise that resolves to the result of the update operation
	 */
	async updateByCode(code: string, fields: Partial<Municipality>) {
		return this.mongoCollection.updateOne({ code } as Filter<Municipality>, { $set: fields });
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { code: 1 }, unique: true },
			{ background: true, key: { name: 1 } },
			{ background: true, key: { prefix: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'municipalities';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_MUNICIPALITIES';
	}
}

export const municipalities = AsyncSingletonProxy(MunicipalitiesClass);
