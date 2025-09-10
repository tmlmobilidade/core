/* * */

import { validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const DocumentSchema = z.object({
	_id: z.string(),
	created_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	created_by: z.string().default('system'),
	updated_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	updated_by: z.string().default('system'),
});
