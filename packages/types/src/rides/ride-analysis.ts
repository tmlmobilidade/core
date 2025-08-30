/* * */

import { z } from 'zod';

/* * */

export const RIDE_ANALYSIS_GRADE_OPTIONS = ['pass', 'fail', 'skip', 'error'] as const;

export const RideAnalysisGradeSchema = z.enum(RIDE_ANALYSIS_GRADE_OPTIONS);

/* * */

export const RideAnalysisSchema = z.object({
	grade: RideAnalysisGradeSchema,
	reason: z.string(),
}).strict();

export type RideAnalysis = z.infer<typeof RideAnalysisSchema>;

/* * */

export const atLeastOneVehicleEventOnFirstStopSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_PATH_DATA', 'NO_VEHICLE_EVENTS', 'NO_VEHICLE_EVENTS_ON_FIRST_STOP', 'ONE_OR_MORE_VEHICLE_EVENTS_ON_FIRST_STOP']),
	value: z.number().nullable(),
}).strict();

export type AtLeastOneVehicleEventOnFirstStop = z.infer<typeof atLeastOneVehicleEventOnFirstStopSchema>;

/* * */

export const expectedDriverIdsQtySchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS', 'UNEXPECTED_DRIVER_IDS_QTY', 'EXPECTED_DRIVER_IDS_QTY']),
	value: z.number().nullable(),
}).strict();

export type ExpectedDriverIdsQty = z.infer<typeof expectedDriverIdsQtySchema>;

/* * */

export const expectedVehicleIdsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS', 'NO_APEX_VALIDATIONS', 'UNEXPECTED_VEHICLE_IDS_QTY', 'EXPECTED_VEHICLE_IDS_QTY']),
	value: z.number().nullable(),
}).strict();

export type ExpectedVehicleIds = z.infer<typeof expectedVehicleIdsSchema>;

/* * */

export const avgIntervalVehicleEventsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS', 'AVG_INTERVAL_OUTSIDE_LIMIT', 'AVG_INTERVAL_WITHIN_LIMIT']),
	value: z.number().nullable(),
}).strict();

export type AvgIntervalVehicleEvents = z.infer<typeof avgIntervalVehicleEventsSchema>;

/* * */

export const endedAtLastStopSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_PATH_DATA', 'NO_VEHICLE_EVENTS', 'ENDED_AT_LAST_STOP', 'ENDED_OUTSIDE_OF_LAST_STOP']),
}).strict();

export type EndedAtLastStop = z.infer<typeof endedAtLastStopSchema>;

/* * */

export const expectedVehicleEventDelaySchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS', 'UNEXPECTED_VEHICLE_EVENTS_DELAY', 'EXPECTED_VEHICLE_EVENTS_DELAY']),
	value: z.number().nullable(),
}).strict();

export type ExpectedVehicleEventDelay = z.infer<typeof expectedVehicleEventDelaySchema>;

/* * */

export const expectedVehicleEventsQtySchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS', 'EXPECTED_VEHICLE_EVENTS_QTY', 'UNEXPECTED_VEHICLE_EVENTS_QTY']),
	value: z.number().nullable(),
}).strict();

export type ExpectedVehicleEventsQty = z.infer<typeof expectedVehicleEventsQtySchema>;

/* * */

export const matchingApexLocationsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_PATH_DATA', 'NO_APEX_LOCATIONS', 'MISSING_APEX_LOCATION_FOR_AT_LEAST_ONE_STOP', 'MATCHING_APEX_LOCATIONS']),
}).strict();

export type MatchingApexLocations = z.infer<typeof matchingApexLocationsSchema>;

/* * */

export const expectedStartTimeSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_PATH_DATA', 'NO_VEHICLE_EVENTS', 'UNKNOWN_START', 'EARLY_START', 'LATE_START', 'START_ON_TIME']),
	value: z.number().nullable(),
}).strict();

export type ExpectedStartTime = z.infer<typeof expectedStartTimeSchema>;

/* * */

export const simpleOneApexValidationSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_APEX_VALIDATIONS', 'ONE_OR_MORE_APEX_VALIDATIONS']),
	value: z.number().nullable(),
}).strict();

export type SimpleOneApexValidation = z.infer<typeof simpleOneApexValidationSchema>;

/* * */

export const simpleOneVehicleEventOrApexValidationSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VEHICLE_EVENTS_OR_APEX_VALIDATIONS', 'FOUND_VEHICLE_EVENT_OR_APEX_VALIDATION']),
}).strict();

export type SimpleOneVehicleEventOrApexValidation = z.infer<typeof simpleOneVehicleEventOrApexValidationSchema>;

/* * */

export const simpleThreeVehicleEventsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_PATH_DATA', 'NO_VEHICLE_EVENTS', 'MISSING_FIRST_STOPS', 'MISSING_MIDDLE_STOPS', 'MISSING_LAST_STOPS', 'ALL_STOPS_FOUND']),
	stop_ids_first: z.array(z.string()).nullable(),
	stop_ids_last: z.array(z.string()).nullable(),
	stop_ids_middle: z.array(z.string()).nullable(),
}).strict();

export type SimpleThreeVehicleEvents = z.infer<typeof simpleThreeVehicleEventsSchema>;

/* * */

export const transactionSequentialitySchema = RideAnalysisSchema.extend({
	reason: z.enum(['MISSING_TRANSACTIONS', 'ALL_TRANSACTIONS_RECEIVED']),
}).strict();

export type TransactionSequentiality = z.infer<typeof transactionSequentialitySchema>;

/* * */

export const matchingVehicleIdsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['MATCHING_VEHICLE_IDS', 'VEHICLE_ID_MISMATCH', 'NO_VEHICLE_EVENTS_FOUND', 'NO_APEX_TRANSACTIONS_FOUND']),
}).strict();

export type MatchingVehicleIds = z.infer<typeof matchingVehicleIdsSchema>;

/* * */

export const expectedApexValidationIntervalSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_VALIDATIONS_FOUND', 'UNEXPECTED_VALIDATION_INTERVALS', 'EXPECTED_VALIDATION_INTERVALS']),
	value: z.number().nullable(),
}).strict();

export type ExpectedApexValidationInterval = z.infer<typeof expectedApexValidationIntervalSchema>;
