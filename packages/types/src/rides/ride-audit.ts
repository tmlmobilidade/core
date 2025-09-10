/* * */

import { CommentSchema } from '@/_common/comment.js';
import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const RideAuditSchema = DocumentSchema.extend({
	comments: z.array(CommentSchema).default([]),
	is_locked: z.boolean().default(false),
	ride_id: z.string(),
}).strict();

export const CreateRideAuditSchema = RideAuditSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideAuditSchema = CreateRideAuditSchema.partial();

/* * */

export interface RideAudit extends Omit<z.infer<typeof RideAuditSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type CreateRideAuditDto = z.infer<typeof CreateRideAuditSchema>;
export type UpdateRideAuditDto = Partial<CreateRideAuditDto>;
