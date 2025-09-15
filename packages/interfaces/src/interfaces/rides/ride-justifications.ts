/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateRideJustificationDto, RideJustification, RideJustificationSchema, UpdateRideJustificationDto, UpdateRideJustificationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';
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

	public async createByTripId(trip_id: string, data: CreateRideJustificationDto): Promise<RideJustification> {
		return super.insertOne({ ...data, trip_id } as RideJustification) as Promise<RideJustification>;
	}

	public async findByTripId(trip_id: string): Promise<null | RideJustification> {
		return super.findOne({ trip_id } as Filter<RideJustification>) as Promise<null | RideJustification>;
	}

	public async updateByTripId(trip_id: string, data: UpdateRideJustificationDto): Promise<RideJustification> {
		return super.updateOne({ trip_id } as Filter<RideJustification>, data) as Promise<RideJustification>;
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
