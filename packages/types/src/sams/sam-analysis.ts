/* * */

import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const SamAnalysisSchema = z.object({
	apex_version: z.string().nullable(),
	device_id: z.string().nullable(),
	end_time: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	start_time: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	transactions_expected: z.number().nullable(),
	transactions_found: z.number().nullable(),
	transactions_missing: z.number().nullable(),
	vehicle_id: z.number().nullable(),
}).strict();

export interface SamAnalysis extends Omit<z.infer<typeof SamAnalysisSchema>, 'end_time' | 'start_time'> {
	end_time: null | UnixTimestamp
	start_time: null | UnixTimestamp
}
