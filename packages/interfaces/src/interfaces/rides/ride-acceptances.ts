/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { CreateRideAcceptanceDto, RideAcceptance, RideAcceptanceSchema, UpdateRideAcceptanceDto, UpdateRideAcceptanceSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy, compareObjects, Dates, flattenObject } from '@tmlmobilidade/utils';
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
		data.comments.push({
			created_at: Dates.now('utc').unix_timestamp,
			created_by: data.created_by || 'system',
			message: 'Ride acceptance created',
			type: 'note',
			updated_at: Dates.now('utc').unix_timestamp,
		});

		return super.insertOne({ ...data, ride_id } as RideAcceptance) as Promise<RideAcceptance>;
	}

	public async findByRideId(ride_id: string): Promise<null | RideAcceptance> {
		return super.findOne({ ride_id } as Filter<RideAcceptance>) as Promise<null | RideAcceptance>;
	}

	public async updateByRideId(ride_id: string, data: UpdateRideAcceptanceDto): Promise<RideAcceptance> {
		const prevAcceptance = await this.findByRideId(ride_id);

		if (!prevAcceptance) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'Ride acceptance not found');
		}

		const diff = compareObjects<RideAcceptance>(prevAcceptance, data);
		const flattenedDiff = flattenObject(diff);

		data.comments = data.comments || prevAcceptance.comments || [];

		for (const key of Object.keys(flattenedDiff)) {
			if (key === 'is_locked') {
				data.comments.push({
					created_at: Dates.now('utc').unix_timestamp,
					created_by: data.updated_by || 'system',
					curr_value: data[key],
					field: key,
					prev_value: prevAcceptance[key],
					type: 'field_changed',
					updated_at: Dates.now('utc').unix_timestamp,
				});
			}

			if (key === 'acceptance_status') {
				data.comments.push({
					created_at: Dates.now('utc').unix_timestamp,
					created_by: data.updated_by || 'system',
					curr_value: data[key],
					field: key,
					prev_value: prevAcceptance[key],
					type: 'field_changed',
					updated_at: Dates.now('utc').unix_timestamp,
				});
			}

			if (key === 'justification.pto_message' && data.justification?.pto_message) {
				data.comments.push({
					created_at: Dates.now('utc').unix_timestamp,
					created_by: data.updated_by || 'system',
					curr_value: data.justification.pto_message,
					field: key,
					prev_value: prevAcceptance.justification?.pto_message,
					type: 'field_changed',
					updated_at: Dates.now('utc').unix_timestamp,
				});
			}

			if (key === 'justification.justification_cause' && data.justification?.justification_cause) {
				data.comments.push({
					created_at: Dates.now('utc').unix_timestamp,
					created_by: data.updated_by || 'system',
					curr_value: data.justification.justification_cause,
					field: key,
					prev_value: prevAcceptance.justification?.justification_cause,
					type: 'field_changed',
					updated_at: Dates.now('utc').unix_timestamp,
				});
			}
		}

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

export const rideAcceptances: Omit<RideAcceptanceClass, 'deleteById' | 'deleteMany' | 'deleteOne' | 'insertOne' | 'updateById' | 'updateMany' | 'updateOne'> = AsyncSingletonProxy(RideAcceptanceClass);
