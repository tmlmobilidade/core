/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { type CreateUniqueSamDto, type UniqueSam, UniqueSamSchema, type UpdateUniqueSamDto, UpdateUniqueSamSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class UniqueSamsClass extends MongoCollectionClass<UniqueSam, CreateUniqueSamDto, UpdateUniqueSamDto> {
	private static _instance: UniqueSamsClass;
	protected override createSchema: z.ZodSchema = UniqueSamSchema;
	protected override updateSchema: z.ZodSchema = UpdateUniqueSamSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!UniqueSamsClass._instance) {
			const instance = new UniqueSamsClass();
			await instance.connect();
			UniqueSamsClass._instance = instance;
		}
		return UniqueSamsClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { created_at: 1 } },
			{ background: true, key: { agency_id: 1 } },
			{ background: true, key: { mac_sam_serial_number: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'unique_sams';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_UNIQUE_SAMS';
	}
}

/* * */

export const uniqueSams = AsyncSingletonProxy(UniqueSamsClass);
