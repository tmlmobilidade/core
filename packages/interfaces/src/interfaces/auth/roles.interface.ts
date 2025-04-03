/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { CreateRoleDto, Role, RoleSchema, UpdateRoleDto, UpdateRoleSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, UpdateResult } from 'mongodb';
import { z } from 'zod';

/* * */

class RolesClass extends MongoCollectionClass<Role, CreateRoleDto, UpdateRoleDto> {
	private static _instance: RolesClass;
	protected override createSchema: z.ZodSchema = RoleSchema;
	protected override updateSchema: z.ZodSchema = UpdateRoleSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!RolesClass._instance) {
			const instance = new RolesClass();
			await instance.connect();
			RolesClass._instance = instance;
		}
		return RolesClass._instance;
	}

	/**
	 * Finds a role by its name
	 *
	 * @param name - The name of the role to find
	 * @returns A promise that resolves to the matching role document or null if not found
	 */
	async findByName(name: string) {
		return this.mongoCollection.findOne({ name } as Filter<Role>);
	}

	/**
	 * Disable Update Many
	 */
	override async updateMany(): Promise<UpdateResult<Role>> {
		throw new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for roles');
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'roles';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_AUTH';
	}
}

export const roles = AsyncSingletonProxy(RolesClass);
