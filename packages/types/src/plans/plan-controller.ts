/* * */

import { unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const PlanControllerSchema = z.object({
	last_hash: z.string().nullable(),
	status: ProcessingStatusSchema.default('waiting'),
	timestamp: unixTimeStampSchema.nullable(),
}).strict();

/* * */

export type PlanController = z.infer<typeof PlanControllerSchema>;
