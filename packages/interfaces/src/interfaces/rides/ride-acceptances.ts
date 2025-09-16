/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateRideAcceptanceDto, RideAcceptance, RideAcceptanceSchema, UpdateRideAcceptanceDto, UpdateRideAcceptanceSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class RideAcceptanceClass extends MongoCollectionClass<RideAcceptance, CreateRideAcceptanceDto, UpdateRideAcceptanceDto> {
	private static _instance: RideAcceptanceClass;
	protected override createSchema: z.ZodSchema = RideAcceptanceSchema;
	protected override updateSchema: z.ZodSchema = UpdateRideAcceptanceSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!RideAcceptanceClass._instance) {
			const instance = new RideAcceptanceClass();
			await instance.connect();
			RideAcceptanceClass._instance = instance;
		}
		return RideAcceptanceClass._instance;
	}

	public async createByRideId(ride_id: string, data: CreateRideAcceptanceDto): Promise<RideAcceptance> {
		return super.insertOne({ ...data, ride_id } as RideAcceptance) as Promise<RideAcceptance>;
	}

	public async findByRideId(ride_id: string): Promise<null | RideAcceptance> {
		return super.findOne({ ride_id } as Filter<RideAcceptance>) as Promise<null | RideAcceptance>;
	}

	public async updateByRideId(ride_id: string, data: UpdateRideAcceptanceDto): Promise<RideAcceptance> {
		return super.updateOne({ ride_id } as Filter<RideAcceptance>, data) as Promise<RideAcceptance>;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { ride_id: 1 } },
			{ background: true, key: { acceptance_status: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'ride_acceptances';
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

/* * */

export const rideAcceptances = AsyncSingletonProxy(RideAcceptanceClass);
