import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { AsyncSingletonProxy } from '@/lib/utils';
import { CreateUserDto, UpdateUserDto, User } from '@/types';
import { Filter, IndexDescription, Sort, WithId } from 'mongodb';

type NewType = string;

class UsersClass extends MongoCollectionClass<User, CreateUserDto, UpdateUserDto> {
	private static _instance: UsersClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!UsersClass._instance) {
			const instance = new UsersClass();
			await instance.connect();
			UsersClass._instance = instance;
		}
		return UsersClass._instance;
	}

	/**
	 * Finds a user document by its email.
	 *
	 * @param email - The email of the user to find
	 * @param includePasswordHash - Whether to include the password hash in the result
	 * @returns A promise that resolves to the matching user document or null if not found
	 */
	async findByEmail(email: string, includePasswordHash = false): Promise<null | WithId<User>> {
		const user = await this.mongoCollection.findOne({ email } as Filter<User>);
		if (!user) {
			return null;
		}

		return includePasswordHash ? user : this.deletePasswordHash(user) as WithId<User>;
	}

	/**
	 * Finds a document by its ID.
	 *
	 * @param id - The ID of the document to find
	 * @param includePasswordHash - Whether to include the password hash in the result
	 * @returns A promise that resolves to the matching document or null if not found
	 */
	async findById(id: string, includePasswordHash = false) {
		const user = await this.mongoCollection.findOne({ _id: id } as unknown as Filter<User>);
		if (!user) {
			return null;
		}

		return includePasswordHash ? user : this.deletePasswordHash(user) as WithId<User>;
	}

	/**
	 * Finds users by their organization code
	 *
	 * @param code - The code of the organization to find users for
	 * @param includePasswordHash - Whether to include the password hash in the result
	 * @returns A promise that resolves to the matching user documents or null if not found
	 */
	async findByOrganization(id: NewType, includePasswordHash = false) {
		const users = await this.mongoCollection.find({ organization_ids: { $in: [id] } } as unknown as Filter<User>).toArray();
		return includePasswordHash ? users : users.map(user => this.deletePasswordHash(user));
	}

	/**
	 * Finds a user by their role
	 *
	 * @param role - The role of the user to find
	 * @returns A promise that resolves to the matching user document or null if not found
	 */
	async findByRole(role: string, includePasswordHash = false) {
		const users = await this.mongoCollection.find({ role_ids: { $in: [role] } } as unknown as Filter<User>).toArray();
		return includePasswordHash ? users : users.map(user => this.deletePasswordHash(user));
	}

	/**
	 * Finds multiple documents matching the filter criteria with optional pagination and sorting.
	 *
	 * @param filter - (Optional) filter criteria to match documents
	 * @param perPage - (Optional) number of documents per page for pagination
	 * @param page - (Optional) page number for pagination
	 * @param sort - (Optional) sort specification
	 * @returns A promise that resolves to an array of matching documents
	 */
	async findMany(filter?: Filter<User>, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find(filter ?? {});
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		const users = await query.toArray();
		return users.map(user => this.deletePasswordHash(user) as WithId<User>);
	}

	async findOne(filter: Filter<User>) {
		const user = await this.mongoCollection.findOne(filter);
		if (!user) {
			return null;
		}

		return this.deletePasswordHash(user) as WithId<User>;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { email: 1 }, unique: true },
			{ background: true, key: { 'profile.first_name': 1, 'profile.last_name': 1 } },
			{ background: true, key: { session_ids: 1 } },
			{ background: true, key: { role_ids: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'users';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_AUTH';
	}

	private deletePasswordHash(user: WithId<User>) {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { password_hash, ...userWithoutPassword } = user;
		return userWithoutPassword;
	}
}

export const users = AsyncSingletonProxy(UsersClass);
