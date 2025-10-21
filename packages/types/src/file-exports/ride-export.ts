/* * */

import { RideSchema } from '@/rides/ride.js';
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
	start_time_observed: z.number(),
	start_time_scheduled: z.number(),
	system_status: z.string(),
	trip_id: z.string(),
	updated_at: z.number(),
	vehicle_ids: z.string(),
});

/* PROPERTIES SCHEMA */
/* * */
export const RideExportPropertiesSchema = z.object({
	agency_ids: z.array(RideSchema.shape.agency_id).optional(),
	end_date: RideSchema.shape.end_time_scheduled,
	line_ids: z.array(RideSchema.shape.line_id).optional(),
	start_date: RideSchema.shape.start_time_scheduled,
});

export type RideExportProperties = z.infer<typeof RideExportPropertiesSchema>;
export type RideExportData = z.infer<typeof FlatRideSchema>;

/* CREATE SCHEMA */
/* * */

export const RideExportSchema = FileExportBaseSchema.extend({
	properties: RideExportPropertiesSchema,
	type: z.literal('ride'),
}).strict();
