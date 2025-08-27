/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export const ACCEPTANCE_STATUS_OPTIONS = ['justification_required', 'under_review', 'accepted', 'rejected'] as const;

export const AcceptanceStatusSchema = z.enum(ACCEPTANCE_STATUS_OPTIONS);

/* * */

export const RideJustificationSchema = z.object({
	comments: z.array(CommentSchema).default([]),
	file_ids: z.array(z.string()).default([]),
	pto_message: z.string().min(2).max(5000).default(''),
	updated_trip_id: z.string().min(2).max(100).nullable(),
}).strict();

export type RideJustification = z.infer<typeof RideJustificationSchema>;

/* * */

export const RidePaymentSchema = z.object({
	acceptance_status: AcceptanceStatusSchema,
	comments: z.array(CommentSchema).default([]),
	file_ids: z.array(z.string()).default([]),
	pto_message: z.string().min(2).max(5000).default(''),
	updated_trip_id: z.string().min(2).max(100).nullable(),
}).strict();

export type RidePayment = z.infer<typeof RidePaymentSchema>;

/* * */

export const RideAnnotationSchema = DocumentSchema.extend({
	acceptance_status: AcceptanceStatusSchema,
	justification: RideJustificationSchema,
	payment: RidePaymentSchema,
}).strict();

export type RideAnnotation = z.infer<typeof RideAnnotationSchema>;

/**
 * Uma ride-annotation é gerada 3 dias depois da hora prevista de conclusão.
 *
 */

const rideAnnotation = {
	_id: 'some-id',
	_ride_id: '123',
	justification: {
		comments: [],
		file_ids: [],
		pto_message: '',
		updated_trip_id: null,
	},
};
