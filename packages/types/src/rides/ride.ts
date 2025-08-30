/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type OperationalDate, validateOperationalDate } from '@/_common/operational-date.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { atLeasOneEventOnFirstStopSchema, atMostTwoDriverIdsSchema, atMostTwoVehicleIdsSchema, avgIntervalVehicleEventsSchema, endedAtLastStopSchema, excessiveVehicleEventDelaySchema, lessThanTenVehicleEventsSchema, matchingLocationTransactionsSchema, matchingVehicleIdsSchema, normalValidationIntervalSchema, ontimeStartSchema, simpleOneValidationTransactionSchema, simpleOneVehicleEventOrValidationTransactionSchema, simpleThreeVehicleEventsSchema, transactionSequentialitySchema } from '@/rides/ride-analysis.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const RideSchema = DocumentSchema.extend({
	agency_id: z.string(),
	analysis: z.object({
		AT_LEAST_ONE_EVENT_ON_FIRST_STOP: atLeasOneEventOnFirstStopSchema,
		AT_MOST_TWO_DRIVER_IDS: atMostTwoDriverIdsSchema,
		AT_MOST_TWO_VEHICLE_IDS: atMostTwoVehicleIdsSchema,
		AVG_INTERVAL_VEHICLE_EVENTS: avgIntervalVehicleEventsSchema,
		ENDED_AT_LAST_STOP: endedAtLastStopSchema,
		EXCESSIVE_VEHICLE_EVENT_DELAY: excessiveVehicleEventDelaySchema,
		LESS_THAN_TEN_VEHICLE_EVENTS: lessThanTenVehicleEventsSchema,
		MATCHING_LOCATION_TRANSACTIONS: matchingLocationTransactionsSchema,
		MATCHING_VEHICLE_IDS: matchingVehicleIdsSchema,
		NORMAL_VALIDATION_INTERVAL: normalValidationIntervalSchema,
		ONTIME_START: ontimeStartSchema,
		SIMPLE_ONE_VALIDATION_TRANSACTION: simpleOneValidationTransactionSchema,
		SIMPLE_ONE_VEHICLE_EVENT_OR_VALIDATION_TRANSACTION: simpleOneVehicleEventOrValidationTransactionSchema,
		SIMPLE_THREE_VEHICLE_EVENTS: simpleThreeVehicleEventsSchema,
		TRANSACTION_SEQUENTIALITY: transactionSequentialitySchema,
	}).nullable(),
	apex_locations_qty: z.number().nullable(),
	apex_on_board_refunds_amount: z.number().nullable(),
	apex_on_board_refunds_qty: z.number().nullable(),
	apex_on_board_sales_amount: z.number().nullable(),
	apex_on_board_sales_qty: z.number().nullable(),
	apex_on_board_sales_validations_qty: z.number().nullable(),
	apex_validations_prepaid_amount: z.number().nullable(),
	apex_validations_prepaid_qty: z.number().nullable(),
	apex_validations_qty: z.number().nullable(),
	apex_validations_subscription_qty: z.number().nullable(),
	driver_ids: z.array(z.string()),
	end_time_observed: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	end_time_scheduled: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	execution_status: z.enum(['success', 'failure', 'warning']).nullable(),
	extension_observed: z.number().nullable(),
	extension_scheduled: z.number(),
	hashed_shape_id: z.string(),
	hashed_trip_id: z.string(),
	headsign: z.string(),
	line_id: z.number(),
	operational_date: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	passengers_estimated: z.number().nullable(),
	passengers_observed: z.number().nullable(),
	pattern_id: z.string(),
	plan_id: z.string(),
	route_id: z.string(),
	seen_first_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	seen_last_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	start_time_observed: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	start_time_scheduled: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	system_status: ProcessingStatusSchema.default('waiting'),
	trip_id: z.string(),
	vehicle_ids: z.array(z.number()),
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

/* * */

export const RidePermissionSchema = z.object({
	agency_ids: z.array(z.string()),
});

export type RidePermission = z.infer<typeof RidePermissionSchema>;
