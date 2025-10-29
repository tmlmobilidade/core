/* * */

import { unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { gtfsCauseSchema } from '@/gtfs/cause-effetcs.js';
import { RideAcceptanceStatusSchema, RideJustificationSourceSchema } from '@/rides/ride-acceptance.js';
import { RideAnalysisGradeWithNoneSchema } from '@/rides/ride-analysis.js';
import { RideDelayStatusSchema, RideOperationalStatusSchema, RideSeenStatusSchema } from '@/rides/ride.js';
import { z } from 'zod';

import { FileExportBaseSchema } from './common.js';

/* DATA SCHEMA */
/* * */
export const FlatRideSchema = z.object({
	_id: z.string(),
	agency_id: z.string(),
	analysis_AT_LEAST_ONE_VEHICLE_EVENT_ON_FIRST_STOP_grade: z.string(),
	analysis_AT_LEAST_ONE_VEHICLE_EVENT_ON_FIRST_STOP_reason: z.string(),
	analysis_ENDED_AT_LAST_STOP_grade: z.string(),
	analysis_ENDED_AT_LAST_STOP_reason: z.string(),
	analysis_EXPECTED_APEX_VALIDATION_INTERVAL_grade: z.string(),
	analysis_EXPECTED_APEX_VALIDATION_INTERVAL_reason: z.string(),
	analysis_EXPECTED_DRIVER_ID_QTY_grade: z.string(),
	analysis_EXPECTED_DRIVER_ID_QTY_reason: z.string(),
	analysis_EXPECTED_START_TIME_grade: z.string(),
	analysis_EXPECTED_START_TIME_reason: z.string(),
	analysis_EXPECTED_START_TIME_value: z.number(),
	analysis_EXPECTED_VEHICLE_EVENT_DELAY_grade: z.string(),
	analysis_EXPECTED_VEHICLE_EVENT_DELAY_reason: z.string(),
	analysis_EXPECTED_VEHICLE_EVENT_INTERVAL_grade: z.string(),
	analysis_EXPECTED_VEHICLE_EVENT_INTERVAL_reason: z.string(),
	analysis_EXPECTED_VEHICLE_EVENT_QTY_expected_qty: z.number(),
	analysis_EXPECTED_VEHICLE_EVENT_QTY_found_qty: z.number(),
	analysis_EXPECTED_VEHICLE_EVENT_QTY_grade: z.string(),
	analysis_EXPECTED_VEHICLE_EVENT_QTY_reason: z.string(),
	analysis_EXPECTED_VEHICLE_ID_QTY_grade: z.string(),
	analysis_EXPECTED_VEHICLE_ID_QTY_reason: z.string(),
	analysis_MATCHING_APEX_LOCATIONS_grade: z.string(),
	analysis_MATCHING_APEX_LOCATIONS_reason: z.string(),
	analysis_MATCHING_VEHICLE_IDS_grade: z.string(),
	analysis_MATCHING_VEHICLE_IDS_reason: z.string(),
	analysis_SIMPLE_ONE_APEX_VALIDATION_grade: z.string(),
	analysis_SIMPLE_ONE_APEX_VALIDATION_reason: z.string(),
	analysis_SIMPLE_ONE_VEHICLE_EVENT_OR_APEX_VALIDATION_grade: z.string(),
	analysis_SIMPLE_ONE_VEHICLE_EVENT_OR_APEX_VALIDATION_reason: z.string(),
	analysis_SIMPLE_THREE_VEHICLE_EVENTS_grade: z.string(),
	analysis_SIMPLE_THREE_VEHICLE_EVENTS_reason: z.string(),
	analysis_SIMPLE_THREE_VEHICLE_EVENTS_stop_ids_first: z.string(),
	analysis_SIMPLE_THREE_VEHICLE_EVENTS_stop_ids_last: z.string(),
	analysis_SIMPLE_THREE_VEHICLE_EVENTS_stop_ids_middle: z.string(),
	analysis_TRANSACTION_SEQUENTIALITY_expected_qty: z.number(),
	analysis_TRANSACTION_SEQUENTIALITY_found_qty: z.number(),
	analysis_TRANSACTION_SEQUENTIALITY_grade: z.string(),
	analysis_TRANSACTION_SEQUENTIALITY_missing_qty: z.number(),
	analysis_TRANSACTION_SEQUENTIALITY_reason: z.string(),
	apex_locations_qty: z.number(),
	apex_on_board_refunds_amount: z.number(),
	apex_on_board_refunds_qty: z.number(),
	apex_on_board_sales_amount: z.number(),
	apex_on_board_sales_qty: z.number(),
	apex_validations_qty: z.number(),
	created_at: z.number(),
	driver_ids: z.string(),
	end_delay_status: z.string(),
	end_time_observed: z.number(),
	end_time_scheduled: z.number(),
	extension_observed: z.number(),
	extension_scheduled: z.number(),
	hashed_shape_id: z.string(),
	hashed_trip_id: z.string(),
	headsign: z.string(),
	is_locked: z.boolean(),
	line_id: z.number(),
	operational_date: z.string(),
	operational_status: z.string(),
	passengers_estimated: z.number(),
	passengers_observed: z.number(),
	passengers_observed_on_board_sales_amount: z.number(),
	passengers_observed_on_board_sales_qty: z.number(),
	passengers_observed_prepaid_amount: z.number(),
	passengers_observed_prepaid_qty: z.number(),
	passengers_observed_subscription_qty: z.number(),
	pattern_id: z.string(),
	plan_id: z.string(),
	route_id: z.string(),
	seen_first_at: z.number(),
	seen_last_at: z.number(),
	seen_status: z.string(),
	start_delay_status: z.string(),
	start_time_observed: z.number(),
	start_time_scheduled: z.number(),
	system_status: z.string(),
	trip_id: z.string(),
	updated_at: z.number(),
	vehicle_ids: z.string(),

	/* ACCEPTANCE / JUSTIFICATION */
	/* * */

	acceptance_status: z.enum(RideAcceptanceStatusSchema.options).nullish(),
	justification_cause: gtfsCauseSchema.nullish(),
	justification_source: z.enum(RideJustificationSourceSchema.options).nullish(),
	manual_trip_id: z.string().nullish(),
	pto_message: z.string().min(2).max(5000).default('').nullish(),
});

/* PROPERTIES SCHEMA */
/* * */
export const RideExportPropertiesSchema = z.object({
	properties: z.object({
		agency_ids: z.array(z.string()).optional(),

		/* * */

		analysis_ended_at_last_stop_grade: z.array(RideAnalysisGradeWithNoneSchema).optional(),
		analysis_expected_apex_validation_interval: z.array(RideAnalysisGradeWithNoneSchema).optional(),
		analysis_simple_three_vehicle_events_grade: z.array(RideAnalysisGradeWithNoneSchema).optional(),
		analysis_transaction_sequentiality: z.array(RideAnalysisGradeWithNoneSchema).optional(),

		/* * */

		date_end: unixTimeStampSchema,
		date_start: unixTimeStampSchema,

		/* * */

		delay_statuses: z.array(RideDelayStatusSchema).optional(),
		operational_statuses: z.array(RideOperationalStatusSchema).optional(),
		seen_statuses: z.array(RideSeenStatusSchema).optional(),

		/* * */

		line_ids: z.array(z.string()).optional(),
		stop_ids: z.array(z.string()).optional(),

		/* * */
		acceptance_status: z.array(z.enum([...RideAcceptanceStatusSchema.options, 'none'])).optional(),
	}),
	type: z.literal('ride'),
});

/* CREATE SCHEMA */
/* * */
export const RideExportSchema = FileExportBaseSchema.extend(RideExportPropertiesSchema.shape).strict();

/* TYPES */
/* * */
export type RideExportProperties = z.infer<typeof RideExportPropertiesSchema>;
export type RideExportData = z.infer<typeof FlatRideSchema>;
