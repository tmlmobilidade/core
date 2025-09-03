/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type OperationalDate, validateOperationalDate } from '@/_common/operational-date.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { atLeastOneVehicleEventOnFirstStopSchema, endedAtLastStopSchema, expectedApexValidationIntervalSchema, expectedDriverIdQtySchema, expectedStartTimeSchema, expectedVehicleEventDelaySchema, expectedVehicleEventIntervalSchema, expectedVehicleEventQtySchema, expectedVehicleIdQtySchema, matchingApexLocationsSchema, matchingVehicleIdsSchema, RideAnalysisGradeSchema, simpleOneApexValidationSchema, simpleOneVehicleEventOrApexValidationSchema, simpleThreeVehicleEventsSchema, transactionSequentialitySchema } from '@/rides/ride-analysis.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const RideSchema = DocumentSchema.extend({
	agency_id: z.string(),
	analysis: z.object({
		AT_LEAST_ONE_VEHICLE_EVENT_ON_FIRST_STOP: atLeastOneVehicleEventOnFirstStopSchema,
		ENDED_AT_LAST_STOP: endedAtLastStopSchema,
		EXPECTED_APEX_VALIDATION_INTERVAL: expectedApexValidationIntervalSchema,
		EXPECTED_DRIVER_ID_QTY: expectedDriverIdQtySchema,
		EXPECTED_START_TIME: expectedStartTimeSchema,
		EXPECTED_VEHICLE_EVENT_DELAY: expectedVehicleEventDelaySchema,
		EXPECTED_VEHICLE_EVENT_INTERVAL: expectedVehicleEventIntervalSchema,
		EXPECTED_VEHICLE_EVENT_QTY: expectedVehicleEventQtySchema,
		EXPECTED_VEHICLE_ID_QTY: expectedVehicleIdQtySchema,
		MATCHING_APEX_LOCATIONS: matchingApexLocationsSchema,
		MATCHING_VEHICLE_IDS: matchingVehicleIdsSchema,
		SIMPLE_ONE_APEX_VALIDATION: simpleOneApexValidationSchema,
		SIMPLE_ONE_VEHICLE_EVENT_OR_APEX_VALIDATION: simpleOneVehicleEventOrApexValidationSchema,
		SIMPLE_THREE_VEHICLE_EVENTS: simpleThreeVehicleEventsSchema,
		TRANSACTION_SEQUENTIALITY: transactionSequentialitySchema,
	}).nullable(),
	apex_locations_qty: z.number().nullable(),
	apex_on_board_refunds_amount: z.number().nullable(),
	apex_on_board_refunds_qty: z.number().nullable(),
	apex_on_board_sales_amount: z.number().nullable(),
	apex_on_board_sales_qty: z.number().nullable(),
	apex_validations_qty: z.number().nullable(),
	driver_ids: z.array(z.string()),
	end_time_observed: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	end_time_scheduled: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	extension_observed: z.number().nullable(),
	extension_scheduled: z.number(),
	hashed_shape_id: z.string(),
	hashed_trip_id: z.string(),
	headsign: z.string(),
	line_id: z.number(),
	operational_date: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	passengers_estimated: z.number().nullable(),
	passengers_observed: z.number().nullable(),
	passengers_observed_on_board_sales_amount: z.number().nullable(),
	passengers_observed_on_board_sales_qty: z.number().nullable(),
	passengers_observed_prepaid_amount: z.number().nullable(),
	passengers_observed_prepaid_qty: z.number().nullable(),
	passengers_observed_subscription_qty: z.number().nullable(),
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
}).strip();

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

/* * */

const RideAnalysisGradeWithNoneSchema = RideAnalysisGradeSchema.or(z.literal('none'));

const operationalStatusOptions = ['ended', 'missed', 'running', 'scheduled'] as const;
export const operationalStatusValues = [...operationalStatusOptions];

/* * */

const delayStatusOptions = ['delayed', 'early', 'ontime', 'none'] as const;
export const delayStatusValues = [...delayStatusOptions];

/* * */

const seenStatusOptions = ['gone', 'seen', 'unseen'] as const;
export const seenStatusValues = [...seenStatusOptions];

export const GetRidesBatchQuerySchema = z.object({
	agency_ids: z.preprocess((val: string) => val ? val.split(',').map(id => id.trim()) : [], z.array(z.string())).optional(),
	search: z.string().optional(),

	/* * */

	analysis_ended_at_last_stop_grade: z.preprocess((val: string) => val ? val.split(',').map(grade => grade.trim()) : [], z.array(RideAnalysisGradeWithNoneSchema)).optional(),
	analysis_expected_apex_validation_interval: z.preprocess((val: string) => val ? val.split(',').map(grade => grade.trim()) : [], z.array(RideAnalysisGradeWithNoneSchema)).optional(),
	analysis_simple_three_vehicle_events_grade: z.preprocess((val: string) => val ? val.split(',').map(grade => grade.trim()) : [], z.array(RideAnalysisGradeWithNoneSchema)).optional(),

	/* * */

	date_end: z.coerce.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	date_start: z.coerce.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),

	/* * */

	delay_statuses: z.preprocess((val: string) => val ? val.split(',').map(status => status.trim()) : [], z.array(z.enum(delayStatusOptions))).optional(),
	operational_statuses: z.preprocess((val: string) => val ? val.split(',').map(status => status.trim()) : [], z.array(z.enum(operationalStatusOptions))).optional(),
	seen_statuses: z.preprocess((val: string) => val ? val.split(',').map(status => status.trim()) : [], z.array(z.enum(seenStatusOptions))).optional(),

	/* * */

	line_ids: z.preprocess((val: string) => val ? val.split(',').map(id => id.trim()) : [], z.array(z.string())).optional(),
	stop_ids: z.preprocess((val: string) => val ? val.split(',').map(id => id.trim()) : [], z.array(z.string())).optional(),
});

export type GetRidesBatchQuery = z.infer<typeof GetRidesBatchQuerySchema>;
