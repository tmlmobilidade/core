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

export const atLeasOneEventOnFirstStopSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_ONE_OR_MORE_EVENTS_ON_FIRST_STOP', 'NO_EVENTS_FOUND_ON_FIRST_STOP']),
}).strict();

export type AtLeastOneEventOnFirstStop = z.infer<typeof atLeasOneEventOnFirstStopSchema>;

/* * */

export const atMostTwoDriverIdsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_MORE_THAN_2_DRIVER_IDS', 'FOUND_ONE_OR_TWO_DRIVER_IDS', 'NO_DRIVER_ID_FOUND']),
}).strict();

export type AtMostTwoDriverIds = z.infer<typeof atMostTwoDriverIdsSchema>;

/* * */

export const atMostTwoVehicleIdsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_MORE_THAN_2_VEHICLE_IDS', 'FOUND_ONE_OR_TWO_VEHICLE_IDS', 'NO_VEHICLE_ID_FOUND']),
}).strict();

export type AtMostTwoVehicleIds = z.infer<typeof atMostTwoVehicleIdsSchema>;

/* * */

export const avgIntervalVehicleEventsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['AVG_INTERVAL_HIGHER_THAN_20_SECONDS', 'AVG_INTERVAL_LOWER_THAN_OR_EQUAL_TO_20_SECONDS', 'NO_VEHICLE_EVENTS_FOUND']),
}).strict();

export type AvgIntervalVehicleEvents = z.infer<typeof avgIntervalVehicleEventsSchema>;

/* * */

export const endedAtLastStopSchema = RideAnalysisSchema.extend({
	reason: z.enum(['ENDED_AT_LAST_STOP', 'ENDED_OUTSIDE_OF_LAST_STOP', 'NO_VEHICLE_EVENTS_FOUND', 'NO_PATH_DATA']),
}).strict();

export type EndedAtLastStop = z.infer<typeof endedAtLastStopSchema>;

/* * */

export const excessiveVehicleEventDelaySchema = RideAnalysisSchema.extend({
	reason: z.enum(['ALL_VEHICLE_EVENTS_ARE_WITHIN_DELAY_LIMITS', 'THERE_ARE_VEHICLE_EVENTS_WITH_EXCESSIVE_DELAY']),
}).strict();

export type ExcessiveVehicleEventDelay = z.infer<typeof excessiveVehicleEventDelaySchema>;

/* * */

export const lessThanTenVehicleEventsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_MORE_THAN_10_VEHICLE_EVENTS', 'FOUND_ONLY_1_VEHICLE_EVENT', 'FOUND_LESS_THAN_10_VEHICLE_EVENTS']),
}).strict();

export type LessThanTenVehicleEvents = z.infer<typeof lessThanTenVehicleEventsSchema>;

/* * */

export const matchingLocationTransactionsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['ALL_STOPS_HAVE_LOCATION_TRANSACTIONS', 'MISSING_LOCATION_TRANSACTION_FOR_AT_LEAST_ONE_STOP', 'NO_PATH_DATA']),
}).strict();

export type MatchingLocationTransactions = z.infer<typeof matchingLocationTransactionsSchema>;

/* * */

export const ontimeStartSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NO_OBSERVED_START_TIME', 'NO_SCHEDULED_START_TIME', 'RIDE_STARTED_EARLY', 'RIDE_STARTED_MORE_THAN_FIVE_MINUTES_LATE', 'RIDE_STARTED_ZERO_TO_FIVE_MINUTES_LATE']),
}).strict();

export type OntimeStart = z.infer<typeof ontimeStartSchema>;

/* * */

export const simpleOneValidationTransactionSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_AT_LEAST_ONE_VALIDATION_TRANSACTION', 'NO_VALIDATION_TRANSACTION_FOUND']),
}).strict();

export type SimpleOneValidationTransaction = z.infer<typeof simpleOneValidationTransactionSchema>;

/* * */

export const simpleOneVehicleEventOrValidationTransactionSchema = RideAnalysisSchema.extend({
	reason: z.enum(['FOUND_VEHICLE_EVENT_OR_VALIDATION_TRANSACTION', 'NO_VEHICLE_EVENT_OR_VALIDATION_TRANSACTION_FOUND']),
}).strict();

export type SimpleOneVehicleEventOrValidationTransaction = z.infer<typeof simpleOneVehicleEventOrValidationTransactionSchema>;

/* * */

export const simpleThreeVehicleEventsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['ALL_STOPS_FOUND', 'MISSING_FIRST_STOPS', 'MISSING_LAST_STOPS', 'MISSING_MIDDLE_STOPS', 'NO_PATH_DATA']),
}).strict();

export type SimpleThreeVehicleEvents = z.infer<typeof simpleThreeVehicleEventsSchema>;

/* * */

export const transactionSequentialitySchema = RideAnalysisSchema.extend({
	reason: z.enum(['ALL_TRANSACTIONS_RECEIVED_SO_FAR', 'MISSING_TRANSACTIONS']),
}).strict();

export type TransactionSequentiality = z.infer<typeof transactionSequentialitySchema>;

/* * */

export const matchingVehicleIdsSchema = RideAnalysisSchema.extend({
	reason: z.enum(['MATCHING_VEHICLE_IDS', 'VEHICLE_ID_MISMATCH', 'NO_VEHICLE_ID_FOUND', 'NO_VEHICLE_EVENTS_FOUND', 'NO_APEX_TRANSACTIONS_FOUND']),
	value: z.number().nullable(),
}).strict();

export type MatchingVehicleIds = z.infer<typeof matchingVehicleIdsSchema>;

/* * */

export const normalValidationIntervalSchema = RideAnalysisSchema.extend({
	reason: z.enum(['NORMAL_VALIDATION_INTERVALS', 'ABNORMAL_VALIDATION_INTERVALS', 'NO_VALIDATIONS_FOUND']),
	value: z.number().nullable(),
}).strict();

export type NormalValidationInterval = z.infer<typeof normalValidationIntervalSchema>;
