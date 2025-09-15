/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateRideJustificationDto, RideJustification, RideJustificationSchema, UpdateRideJustificationDto, UpdateRideJustificationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class RideJustificationClass extends MongoCollectionClass<RideJustification, CreateRideJustificationDto, UpdateRideJustificationDto> {
	private static _instance: RideJustificationClass;
	protected override createSchema: z.ZodSchema = RideJustificationSchema;
	protected override updateSchema: z.ZodSchema = UpdateRideJustificationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!RideJustificationClass._instance) {
			const instance = new RideJustificationClass();
			await instance.connect();
			RideJustificationClass._instance = instance;
		}
		return RideJustificationClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { trip_id: 1 } },
			{ background: true, key: { acceptance_status: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'ride_justifications';
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

/* * */

export const rideJustifications = AsyncSingletonProxy(RideJustificationClass);
