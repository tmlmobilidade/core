/* * */

import { DocumentSchema } from '@/common/document.js';
import { z } from 'zod';

/* * */

export const CommentSchema = DocumentSchema.extend({
	_id: z.string(),
	text: z.string(),
	user_id: z.string(),
}).strict();
