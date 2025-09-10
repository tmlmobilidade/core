/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { RideAnalysisGradeSchema, RideAnalysisSchema } from '@/rides/ride-analysis.js';
import { z } from 'zod';

/* * */

export const RIDE_ACCEPTANCE_STATUS_OPTIONS = ['justification_required', 'under_review', 'accepted', 'rejected'] as const;

export const RideAcceptanceStatusSchema = z.enum(RIDE_ACCEPTANCE_STATUS_OPTIONS);

export type RideAcceptanceStatus = z.infer<typeof RideAcceptanceStatusSchema>;

/* * */

export const RideJustificationChangelogSchema = z.object({
	acceptance_status: RideAcceptanceStatusSchema,
	analysis_result: RideAnalysisSchema,
	created_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	created_by: z.string().min(2).max(100),
}).strict();

export interface RideJustificationChangelog extends Omit<z.infer<typeof RideJustificationChangelogSchema>, 'created_at'> {
	created_at: UnixTimestamp
}

/* * */

export const RIDE_JUSTIFICATION_TYPE_OPTIONS = ['traffic_accident', 'traffic_delay', 'accepted', 'rejected'] as const;

export const RideJustificationTypeSchema = z.enum(RIDE_JUSTIFICATION_TYPE_OPTIONS);

export type RideJustificationType = z.infer<typeof RideJustificationTypeSchema>;

/* * */

export const RideJustificationSchema = DocumentSchema.extend({
	acceptance_status: RideAcceptanceStatusSchema,
	changelog: z.array(RideJustificationChangelogSchema).default([]),
	comments: z.array(CommentSchema).default([]),
	pto_message: z.string().min(2).max(5000).default(''),
}).strict();

export const CreateRideJustificationSchema = RideJustificationSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideJustificationSchema = CreateRideJustificationSchema.partial();

export interface RideJustification extends Omit<z.infer<typeof RideJustificationSchema>, 'changelog' | 'created_at' | 'updated_at'> {
	changelog: RideJustificationChangelog[]
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type CreateRideJustificationDto = z.infer<typeof CreateRideJustificationSchema>;
export type UpdateRideJustificationDto = Partial<CreateRideJustificationDto>;

// const example: RideJustification = {
// 	_id: '64b64f4f8f1d2c001f6e4b8a',
// 	acceptance_status: 'rejected',
// 	analysis_result: null,
// 	changelog: [
// 		{
// 			acceptance_status: 'justification_required',
// 			created_at: 1690400000 as UnixTimestamp,
// 			created_by: 'joao',
// 		},
// 	],
// 	comments: [],
// 	created_by: 'joao',
// 	pto_message: '',
// };
