/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateValidationDto, UpdateValidationDto, UpdateValidationSchema, Validation, ValidationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class ValidationsClass extends MongoCollectionClass<Validation, CreateValidationDto, UpdateValidationDto> {
	private static _instance: ValidationsClass;
	protected override createSchema: z.ZodSchema = ValidationSchema;
	protected override updateSchema: z.ZodSchema = UpdateValidationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ValidationsClass._instance) {
			const instance = new ValidationsClass();
			await instance.connect();
			ValidationsClass._instance = instance;
		}
		return ValidationsClass._instance;
	}

	/**
	 * Finds Validation documents by agency ID.
	 *
	 * @param id - The agency ID to search for
	 * @returns A promise that resolves to an array of matching documents
	 */
	async findByAgencyId(id: string) {
		return this.mongoCollection.find({ agency_id: id } as Filter<Validation>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [];
	}

	protected getCollectionName(): string {
		return 'validations';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_PLANS';
	}
}

/* * */

export const validations = AsyncSingletonProxy(ValidationsClass);
