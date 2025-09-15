/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { RideAnalysisSchema } from '@/rides/ride-analysis.js';
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
	analysis: RideAnalysisSchema,
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
