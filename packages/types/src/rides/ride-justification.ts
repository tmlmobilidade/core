/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { atLeastOneVehicleEventOnFirstStopSchema, endedAtLastStopSchema, expectedApexValidationIntervalSchema, expectedDriverIdQtySchema, expectedStartTimeSchema, expectedVehicleEventDelaySchema, expectedVehicleEventIntervalSchema, expectedVehicleEventQtySchema, expectedVehicleIdQtySchema, matchingApexLocationsSchema, matchingVehicleIdsSchema, RideAnalysisSchema, simpleOneApexValidationSchema, simpleOneVehicleEventOrApexValidationSchema, simpleThreeVehicleEventsSchema, transactionSequentialitySchema } from '@/rides/ride-analysis.js';
import { z } from 'zod';

/* * */

export const RIDE_ACCEPTANCE_STATUS_OPTIONS = ['justification_required', 'under_review', 'accepted', 'rejected'] as const;
export const RideAcceptanceStatusSchema = z.enum(RIDE_ACCEPTANCE_STATUS_OPTIONS);
export type RideAcceptanceStatus = z.infer<typeof RideAcceptanceStatusSchema>;

export const RIDE_JUSTIFICATION_CAUSE_OPTIONS = ['TECHNICAL_PROBLEM', 'DEMONSTRATION', 'ACCIDENT', 'WEATHER', 'CONSTRUCTION', 'POLICE_ACTIVITY', 'MEDICAL_EMERGENCY', 'OTHER_CAUSE'] as const;
export const RideJustificationCauseSchema = z.enum(RIDE_JUSTIFICATION_CAUSE_OPTIONS);
export type RideJustificationCause = z.infer<typeof RideJustificationCauseSchema>;

export const RIDE_JUSTIFICATION_SOURCE_OPTIONS = ['MANUAL', 'REALTIME_ALERT'] as const;
export const RideJustificationSourceSchema = z.enum(RIDE_JUSTIFICATION_SOURCE_OPTIONS);
export type RideJustificationSource = z.infer<typeof RideJustificationSourceSchema>;

export const RIDE_JUSTIFICATION_STATUS_TYPE_OPTIONS = ['locked_status', 'acceptance_status', 'pto_message'] as const;
export const RideJustificationStatusTypeSchema = z.enum(RIDE_JUSTIFICATION_STATUS_TYPE_OPTIONS);
export type RideJustificationStatusType = z.infer<typeof RideJustificationStatusTypeSchema>;

/* * */

export const RideJustificationSchema = DocumentSchema.extend({
	acceptance_status: RideAcceptanceStatusSchema,
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
	analysisSummary: RideAnalysisSchema,
	comments: z.array(CommentSchema).default([]),
	is_locked: z.boolean().default(false),
	justification_cause: RideJustificationCauseSchema,
	justification_source: RideJustificationSourceSchema,
	pto_message: z.string().min(2).max(5000).default(''),
	trip_id: z.string(),
}).strict();

export const CreateRideJustificationSchema = RideJustificationSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideJustificationSchema = CreateRideJustificationSchema.omit({ analysis: true, created_by: true, justification_source: true }).partial();

export type RideJustification = z.infer<typeof RideJustificationSchema>;
export type CreateRideJustificationDto = z.infer<typeof CreateRideJustificationSchema>;
export type UpdateRideJustificationDto = z.infer<typeof UpdateRideJustificationSchema>;
