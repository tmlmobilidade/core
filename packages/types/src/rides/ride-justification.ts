/* * */

import { CommentSchema, CommentTypeSchema } from '@/_common/comment.js';
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

/* * */

const CommentSchemaWithRideJustificationStatus = CommentSchema.superRefine((data, ctx) => {
	if (data.type === CommentTypeSchema.enum.statusChanged) {
		const d = data as unknown as { curr_status: string, prev_status: string };
		if (RideAcceptanceStatusSchema.safeParse(d.curr_status).error) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'curr_status must be a valid ride acceptance status',
				path: ['curr_status'],
			});
		}
		if (RideAcceptanceStatusSchema.safeParse(d.prev_status).error) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'prev_status must be a valid ride acceptance status',
				path: ['prev_status'],
			});
		}
	}
});

/* * */

export const RideJustificationSchema = DocumentSchema.extend({
	acceptance_status: RideAcceptanceStatusSchema,
	analysis: RideAnalysisSchema,
	comments: z.array(CommentSchemaWithRideJustificationStatus).default([]),
	justification_cause: RideJustificationCauseSchema,
	pto_message: z.string().min(2).max(5000).default(''),
	trip_id: z.string(),
}).strict();

export const CreateRideJustificationSchema = RideJustificationSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideJustificationSchema = CreateRideJustificationSchema.omit({ created_by: true }).partial();

export type RideJustification = z.infer<typeof RideJustificationSchema>;
export type CreateRideJustificationDto = z.infer<typeof CreateRideJustificationSchema>;
export type UpdateRideJustificationDto = z.infer<typeof UpdateRideJustificationSchema>;
