/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateOrganizationDto, CreateOrganizationSchema, Organization, OrganizationSchema, UpdateOrganizationDto, UpdateOrganizationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, FindOptions, IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class OrganizationClass extends MongoCollectionClass<Organization, CreateOrganizationDto, UpdateOrganizationDto> {
	private static _instance: OrganizationClass;
	protected override createSchema: z.ZodSchema = CreateOrganizationSchema;
	protected override updateSchema: z.ZodSchema = UpdateOrganizationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!OrganizationClass._instance) {
			const instance = new OrganizationClass();
			await instance.connect();
			OrganizationClass._instance = instance;
		}
		return OrganizationClass._instance;
	}

	/**
     * Finds a document by its ID.
     *
     * @param id - The ID of the document to find
     * @returns A promise that resolves to the matching document or null if not found
     */
	override async findById(id: string, options?: FindOptions<Organization>) {
		const organization = await this.mongoCollection.findOne({ _id: id } as unknown as Filter<Organization>, options);
		if (!organization) {
			return null;
		}

		return organization;
	}

	override async findOne(filter: Filter<Organization>) {
		const organization = await this.mongoCollection.findOne(filter);
		if (!organization) {
			return null;
		}

		return organization;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'organizations';
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

export const organization = AsyncSingletonProxy(OrganizationClass);
