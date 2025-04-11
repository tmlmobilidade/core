/* * */

import { DocumentSchema, type OperationalDate, type UnixTimestamp, validateOperationalDate, validateUnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const RideAnalysisSchema = z.object({
	_id: z.string(),
	grade: z.enum(['pass', 'fail', 'error']),
	message: z.string().nullish(),
	reason: z.string().nullish(),
	unit: z.string().nullish(),
	value: z.number().nullish(),
}).strict();

export const CreateRideAnalysisSchema = RideAnalysisSchema;
export const UpdateRideAnalysisSchema = RideAnalysisSchema.partial();

export type RideAnalysis = z.infer<typeof RideAnalysisSchema>;
export type CreateRideAnalysisDto = z.infer<typeof CreateRideAnalysisSchema>;
export type UpdateRideAnalysisDto = Partial<CreateRideAnalysisDto>;

/* * */

export const RideSchema = DocumentSchema.extend({
	agency_id: z.string(),
	analysis: z.array(RideAnalysisSchema),
	driver_ids: z.array(z.string()),
	end_time_observed: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	end_time_scheduled: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	execution_status: z.enum(['success', 'failure', 'warning']).nullish(),
	extension_observed: z.number().nullish(),
	extension_scheduled: z.number(),
	hashed_shape_id: z.string(),
	hashed_trip_id: z.string(),
	headsign: z.string(),
	is_locked: z.boolean().default(false),
	line_id: z.string(),
	operational_date: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	passengers_estimated: z.number().nullish(),
	pattern_id: z.string(),
	plan_id: z.string(),
	route_id: z.string(),
	seen_first_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	seen_last_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	start_time_observed: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	start_time_scheduled: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	system_status: z.enum(['pending', 'processing', 'complete', 'error']),
	trip_id: z.string(),
	validations_count: z.number().nullish(),
	vehicle_ids: z.array(z.string()),
}).strict();

export const CreateRideSchema = RideSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideSchema = CreateRideSchema.partial();

export interface Ride extends Omit<z.infer<typeof RideSchema>, 'created_at' | 'end_time_observed' | 'end_time_scheduled' | 'operational_date' | 'seen_first_at' | 'seen_last_at' | 'start_time_observed' | 'start_time_scheduled' | 'updated_at'> {
	created_at: UnixTimestamp
	end_time_observed: null | UnixTimestamp
	end_time_scheduled: null | UnixTimestamp
	operational_date: OperationalDate
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
	start_time_observed: null | UnixTimestamp
	start_time_scheduled: null | UnixTimestamp
	updated_at: UnixTimestamp
}

export interface CreateRideDto extends Omit<z.infer<typeof CreateRideSchema>, 'end_time_observed' | 'end_time_scheduled' | 'operational_date' | 'seen_first_at' | 'seen_last_at' | 'start_time_observed' | 'start_time_scheduled'> {
	end_time_observed: null | UnixTimestamp
	end_time_scheduled: null | UnixTimestamp
	operational_date: OperationalDate
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
	start_time_observed: null | UnixTimestamp
	start_time_scheduled: null | UnixTimestamp
}

export type UpdateRideDto = Partial<CreateRideDto>;
