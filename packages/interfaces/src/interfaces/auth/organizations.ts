
import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateOrganizationDto, UpdateOrganizationDto, UpdateOrganizationSchema, Organization,
OrganizationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, FindOptions, IndexDescription, WithId } from 'mongodb';
import { z } from 'zod';

/* * */

type NewType = string;

class UsersClass extends MongoCollectionClass<Organization, CreateOrganizationDto, UpdateOrganizationDto> {
    private static _instance: UsersClass;
    protected override createSchema: z.ZodSchema = OrganizationSchema;
    protected override updateSchema: z.ZodSchema = UpdateOrganizationSchema;

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

       return organization
    }


    override async findOne(filter: Filter<Organization>) {
        const organization = await this.mongoCollection.findOne(filter);
        if (!organization) {
            return null;
        }

        return this.deletePasswordHash(organization) as WithId<Organization>;
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
        return 'organizations';
    }

    protected getEnvName(): string {
        return 'DATABASE_URI';
    }
ri
    pvate deletePasswordHash(user: WithId<Organization>) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password_hash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

export const organizations = AsyncSingletonProxy(UsersClass);
