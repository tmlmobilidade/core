import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { CreateLocalityDto, Locality, UpdateLocalityDto } from '@/types';
import { AsyncSingletonProxy } from '@/utils';
import { Filter, IndexDescription } from 'mongodb';

class LocalitiesClass extends MongoCollectionClass<Locality, CreateLocalityDto, UpdateLocalityDto> {
	private static _instance: LocalitiesClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!LocalitiesClass._instance) {
			const instance = new LocalitiesClass();
			await instance.connect();
			LocalitiesClass._instance = instance;
		}
		return LocalitiesClass._instance;
	}

	/**
	 * Finds a locality by its code
	 *
	 * @param code - The code of the locality to find
	 * @returns A promise that resolves to the matching locality document or null if not found
	 */
	async findByCode(code: string) {
		return this.mongoCollection.findOne({ code } as Filter<Locality>);
	}

	/**
	 * Updates a locality by its code
	 *
	 * @param code - The code of the locality to update
	 * @param fields - The fields to update
	 * @returns A promise that resolves to the result of the update operation
	 */
	async updateByCode(code: string, fields: Partial<Locality>) {
		return this.mongoCollection.updateOne({ code } as Filter<Locality>, { $set: fields });
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { code: 1 }, unique: true },
			{ background: true, key: { name: 1 } },
			{ background: true, key: { prefix: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'localities';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_LOCALITIES';
	}
}

export const localities = AsyncSingletonProxy(LocalitiesClass);
