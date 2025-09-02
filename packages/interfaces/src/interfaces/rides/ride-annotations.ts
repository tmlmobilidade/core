/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateRideAnnotationDto, RideAnnotation, RideAnnotationSchema, UpdateRideAnnotationDto, UpdateRideAnnotationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class RideAnnotationsClass extends MongoCollectionClass<RideAnnotation, CreateRideAnnotationDto, UpdateRideAnnotationDto> {
	private static _instance: RideAnnotationsClass;
	protected override createSchema: z.ZodSchema = RideAnnotationSchema;
	protected override updateSchema: z.ZodSchema = UpdateRideAnnotationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!RideAnnotationsClass._instance) {
			const instance = new RideAnnotationsClass();
			await instance.connect();
			RideAnnotationsClass._instance = instance;
		}
		return RideAnnotationsClass._instance;
	}

	/**
	 * Finds ride documents by Ride ID.
	 * @param rideId - The Ride ID to search for.
	 * @returns A promise that resolves to an array of matching ride documents.
	 */
	async findByRideId(rideId: string) {
		return this.mongoCollection.find({ ride_id: rideId } as Filter<RideAnnotation>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		/**
		 * IMPORTANT:
		 * Automatic sorting (ESLint) of keys in the JS objects should be disabled.
		 * The order of keys in a compound index is very important and should be
		 * carefully considered based on the cardinality of each key.
		 */
		return [
			{ background: true, key: { ride_id: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'ride_annotations';
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

/* * */

export const rideAnnotations = AsyncSingletonProxy(RideAnnotationsClass);
