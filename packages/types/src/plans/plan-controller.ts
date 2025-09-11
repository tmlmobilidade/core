/* * */

import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const PlanControllerSchema = z.object({
	last_hash: z.string().nullable(),
	status: ProcessingStatusSchema.default('waiting'),
	timestamp: unixTimeStampSchema.nullable(),
}).strict();

/* * */

export interface PlanController extends Omit<z.infer<typeof PlanControllerSchema>, 'timestamp'> {
	timestamp: UnixTimestamp
}
