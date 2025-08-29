/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { RideAnalysisGradeSchema } from '@/rides/ride-analysis.js';
import { z } from 'zod';

/* * */

export const RIDE_ACCEPTANCE_STATUS_OPTIONS = ['justification_required', 'under_review', 'accepted', 'rejected'] as const;

export const RideAcceptanceStatusSchema = z.enum(RIDE_ACCEPTANCE_STATUS_OPTIONS);

export const RideAcceptanceSchema = DocumentSchema.extend({
	analysis_summary: z.record(RideAnalysisGradeSchema).nullable().default(null),
	created_by: z.string().nullable().default(null),
	mode: z.enum(['manual', 'auto']),
	status: RideAcceptanceStatusSchema,
}).strict();

export type RideAcceptance = z.infer<typeof RideAcceptanceSchema>;

/* * */

export const RideJustificationSchema = z.object({
	comments: z.array(CommentSchema).default([]),
	file_ids: z.array(z.string()).default([]),
	pto_message: z.string().min(2).max(5000).default(''),
}).strict();

export type RideJustification = z.infer<typeof RideJustificationSchema>;

/* * */

export const RideOverridesSchema = z.object({
	trip_id: z.string().nullable().default(null),
}).strict();

export type RideOverrides = z.infer<typeof RideOverridesSchema>;

/* * */

export const RideAnnotationSchema = DocumentSchema.extend({
	acceptance: z.array(RideAcceptanceSchema).default([]),
	is_locked: z.boolean().default(false),
	justification: RideJustificationSchema.nullable().default(null),
	overrides: RideOverridesSchema.nullable().default(null),
	ride_id: z.string(),
}).strict();

export type RideAnnotation = z.infer<typeof RideAnnotationSchema>;
