/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

const COMMENT_TYPE_OPTIONS = ['statusChanged', 'note', 'system_info'] as const;
export const CommentTypeSchema = z.enum(COMMENT_TYPE_OPTIONS);
export type CommentType = z.infer<typeof CommentTypeSchema>;

/* * */

export const NoteCommentSchema = DocumentSchema.extend({
	message: z.string(),
	type: z.literal(CommentTypeSchema.enum.note),
});

export const SystemInfoCommentSchema = DocumentSchema.extend({
	created_by: z.literal('system'),
	message: z.string(),
	type: z.literal(CommentTypeSchema.enum.system_info),
	updated_by: z.literal('system'),
});

export const StatusChangedCommentSchema = DocumentSchema.extend({
	curr_status: z.string(),
	prev_status: z.string(),
	type: z.literal(CommentTypeSchema.enum.statusChanged),
});

export const CommentSchema = z
	.discriminatedUnion('type', [
		NoteCommentSchema,
		SystemInfoCommentSchema,
		StatusChangedCommentSchema,
	])
	.superRefine((data, ctx) => {
		if (data.type === CommentTypeSchema.enum.statusChanged) {
			const d = data as unknown as { curr_status: string, prev_status: string };
			if (d.curr_status === d.prev_status) {
				ctx.addIssue({
					code: z.ZodIssueCode.custom,
					message: 'curr_status and prev_status must differ',
					path: ['curr_status'],
				});
			}
		}
	});

/* * */
export interface Comment extends Omit<z.infer<typeof CommentSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type CreateCommentDto = Omit<z.infer<typeof CommentSchema>, 'created_at' | 'updated_at'>;
export type UpdateCommentDto = Partial<Omit<CreateCommentDto, 'created_by'>>;
