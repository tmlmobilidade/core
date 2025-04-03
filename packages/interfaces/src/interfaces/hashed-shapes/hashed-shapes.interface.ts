/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateHashedShapeDto, HashedShape, HashedShapeSchema, UpdateHashedShapeDto, UpdateHashedShapeSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class HashedShapesClass extends MongoCollectionClass<HashedShape, CreateHashedShapeDto, UpdateHashedShapeDto> {
	private static _instance: HashedShapesClass;
	protected override createSchema: z.ZodSchema = HashedShapeSchema;
	protected override updateSchema: z.ZodSchema = UpdateHashedShapeSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!HashedShapesClass._instance) {
			const instance = new HashedShapesClass();
			await instance.connect();
			HashedShapesClass._instance = instance;
		}
		return HashedShapesClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { agency_id: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'hashed_shapes';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_HASHED_SHAPES';
	}
}

/* * */

export const hashedShapes = AsyncSingletonProxy(HashedShapesClass);
