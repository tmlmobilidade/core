/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const CommentSchema = DocumentSchema.extend({
	_id: z.string(),
	text: z.string(),
}).strict();

/* * */

export interface Comment extends Omit<z.infer<typeof CommentSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}
