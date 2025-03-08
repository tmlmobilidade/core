/* * */

import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { CreateHashedShapeDto, HashedShape, UpdateHashedShapeDto } from '@/interfaces/hashed-shapes/hashed-shape.type';
import { AsyncSingletonProxy } from '@/utils';
import { IndexDescription } from 'mongodb';

/* * */

class HashedShapesClass extends MongoCollectionClass<HashedShape, CreateHashedShapeDto, UpdateHashedShapeDto> {
	private static _instance: HashedShapesClass;

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
