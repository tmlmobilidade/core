/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

const COMMENT_TYPE_OPTIONS = ['status_changed', 'note', 'system_info'] as const;
export const CommentTypeSchema = z.enum(COMMENT_TYPE_OPTIONS);
export type CommentType = z.infer<typeof CommentTypeSchema>;

/* * */

export const NoteCommentSchema = DocumentSchema.extend({
	message: z.string(),
	metadata: z.record(z.unknown()).nullish(),
	type: z.literal(CommentTypeSchema.enum.note),
});

export const SystemInfoCommentSchema = DocumentSchema.extend({
	created_by: z.literal('system'),
	message: z.string(),
	metadata: z.record(z.unknown()).nullish(),
	type: z.literal(CommentTypeSchema.enum.system_info),
	updated_by: z.literal('system'),
});

export const StatusChangedCommentSchema = DocumentSchema.extend({
	accessor: z.string(),
	curr_status: z.string().or(z.boolean()),
	metadata: z.record(z.unknown()).nullish(),
	prev_status: z.string().or(z.boolean()),
	type: z.literal(CommentTypeSchema.enum.status_changed),
});

export const CommentSchema = z
	.discriminatedUnion('type', [
		NoteCommentSchema,
		SystemInfoCommentSchema,
		StatusChangedCommentSchema,
	])
	.superRefine((data, ctx) => {
		if (data.type === CommentTypeSchema.enum.status_changed) {
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

export const CreateCommentSchema = z
	.discriminatedUnion('type', [
		NoteCommentSchema.partial({ _id: true, created_by: true, updated_by: true }).omit({ created_at: true, updated_at: true }),
		SystemInfoCommentSchema.partial({ _id: true, created_by: true, updated_by: true }).omit({ created_at: true, updated_at: true }),
		StatusChangedCommentSchema.partial({ _id: true, created_by: true, updated_by: true }).omit({ created_at: true, updated_at: true }),
	])
	.superRefine((data, ctx) => {
		if (data.type === CommentTypeSchema.enum.status_changed) {
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

export type Comment = z.infer<typeof CommentSchema>;
export type CreateCommentDto = z.infer<typeof CreateCommentSchema>;
export type UpdateCommentDto = Partial<Omit<CreateCommentDto, '_id' | 'created_at' | 'created_by'>>;
