import { MongoCollectionClass } from '@/classes/mongo-collection.class.js';
import { CreateMunicipalityDto, Municipality, UpdateMunicipalityDto } from '@/types/index.js';
import { AsyncSingletonProxy } from '@/utils/index.js';
import { Filter, IndexDescription } from 'mongodb';

class MunicipalitiesClass extends MongoCollectionClass<Municipality, CreateMunicipalityDto, UpdateMunicipalityDto> {
	private static _instance: MunicipalitiesClass;

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
