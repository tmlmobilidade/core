/* * */

import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { AsyncSingletonProxy } from '@/lib/utils';
import { CreateZoneDto, UpdateZoneDto, Zone } from '@/types';
import { Filter, IndexDescription } from 'mongodb';

/* * */

class ZonesClass extends MongoCollectionClass<Zone, CreateZoneDto, UpdateZoneDto> {
	private static _instance: ZonesClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ZonesClass._instance) {
			const instance = new ZonesClass();
			await instance.connect();
			ZonesClass._instance = instance;
		}
		return ZonesClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'zones';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACES_ZONES';
	}

	/**
	 * Finds a zone document by its code.
	 *
	 * @param code - The code of the zone to find
	 * @returns A promise that resolves to the matching zone document or null if not found
	 */
	async findByCode(code: string) {
		return this.mongoCollection.findOne({ code } as Filter<Zone>);
	}

	/**
	 * Finds a zone document by its name.
	 *
	 * @param name - The name of the zone to find
	 * @returns A promise that resolves to the matching zone document or null if not found
	 */
	async findByName(name: string) {
		return this.mongoCollection.findOne({ name } as Filter<Zone>);
	}

	/**
	 * Updates a zone document by its code.
	 *
	 * @param code - The code of the zone to update.
	 * @param updateFields - The fields to update in the zone document.
	 * @returns A promise that resolves to the result of the update operation.
	 */
	async updateByCode(code: string, updateFields: Partial<Zone>) {
		return this.mongoCollection.updateOne({ code } as Filter<Zone>, { $set: updateFields });
	}
}

/* * */

export const zones = AsyncSingletonProxy(ZonesClass);
