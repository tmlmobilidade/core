import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { HttpException, HttpStatus } from '@/lib';
import { CreateRoleDto, Role, UpdateRoleDto } from '@/types';
import { AsyncSingletonProxy } from '@/utils';
import { Filter, IndexDescription, UpdateResult } from 'mongodb';

class RolesClass extends MongoCollectionClass<Role, CreateRoleDto, UpdateRoleDto> {
	private static _instance: RolesClass;

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
