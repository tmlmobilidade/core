/* * */

import { CommentSchema, DocumentSchema, UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ProposedChangeSchema = DocumentSchema.extend({

	field_path: z.string(),

	field_value: z.any(),

	scope: z.enum(['stop', 'lines']),

	status: z.enum(['pending', 'accepted', 'declined']).default('pending'),

	target_id: z.string(),

	user_id: z.string(),

}).strict();

export const CreateProposedChangeSchema = ProposedChangeSchema;
export const UpdateProposedChangeSchema = CreateProposedChangeSchema.partial();

export type ProposedChange = Omit<z.infer<typeof ProposedChangeSchema>, 'created_at' | 'updated_at'> & {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
};
export type CreateProposedChangeDto = Omit<z.infer<typeof CreateProposedChangeSchema>, 'created_at' | 'updated_at'> & {
	created_at?: UnixTimestamp
	updated_at?: UnixTimestamp
};
export type UpdateProposedChangeDto = Partial<CreateProposedChangeDto>;
