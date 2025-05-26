/* * */

import { validateUnixTimestamp } from '@/common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const DocumentSchema = z.object({
	_id: z.string(),
	created_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	updated_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
});
