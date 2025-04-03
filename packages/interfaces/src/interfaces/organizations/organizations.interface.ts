/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { CreateOrganizationDto, Organization, OrganizationSchema, UpdateOrganizationDto, UpdateOrganizationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, UpdateResult } from 'mongodb';
import { z } from 'zod';

/* * */

class OrganizationsClass extends MongoCollectionClass<Organization, CreateOrganizationDto, UpdateOrganizationDto> {
	private static _instance: OrganizationsClass;
	protected override createSchema: z.ZodSchema = OrganizationSchema;
	protected override updateSchema: z.ZodSchema = UpdateOrganizationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!OrganizationsClass._instance) {
			const instance = new OrganizationsClass();
			await instance.connect();
			OrganizationsClass._instance = instance;
		}
		return OrganizationsClass._instance;
	}

	/**
	 * Finds an organization by its code
	 *
	 * @param code - The code of the organization to find
	 * @returns A promise that resolves to the matching organization document or null if not found
	 */
	async findByCode(code: string) {
		return this.mongoCollection.findOne({ code } as Filter<Organization>);
	}

	/**
	 * Updates an organization by its code
	 *
	 * @param code - The code of the organization to update
	 * @param fields - The fields to update
	 * @returns A promise that resolves to the result of the update operation
	 */
	async updateByCode(code: string, fields: Partial<Organization>) {
		return this.mongoCollection.updateOne({ code } as Filter<Organization>, { $set: fields });
	}

	/**
	 * Disable Update Many
	 */
	override async updateMany(): Promise<UpdateResult<Organization>> {
		throw new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for organizations');
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
		return 'TML_INTERFACE_ORGANIZATIONS';
	}
}

export const organizations = AsyncSingletonProxy(OrganizationsClass);
