/* * */

import { DocumentSchema } from '@/common/document.js';
import { type OperationalDate, validateOperationalDate } from '@/common/operational-date.js';
import { type UnixTimestamp } from '@/common/unix-timestamp.js';
import { z } from 'zod';

import { GTFSValidatorSummarySchema } from './gtfs-validation-summary.js';
import { FeederStatusSchema } from './plan.js';
/* * */

export const ValidationSchema = DocumentSchema.extend({
	agency_id: z.string(),
	feeder_status: FeederStatusSchema,
	file_id: z.string().optional(),
	is_locked: z.boolean(),
	summary: GTFSValidatorSummarySchema.optional(),
	valid_from: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	valid_until: z.string().transform(validateOperationalDate).brand('OperationalDate'),
}).strict();

export const CreateValidationSchema = ValidationSchema.omit({ _id: true, created_at: true, updated_at: true });

export const UpdateValidationSchema = CreateValidationSchema.partial();

/* * */

export interface Validation extends Omit<z.infer<typeof ValidationSchema>, 'created_at' | 'updated_at' | 'valid_from' | 'valid_until'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
	valid_from: OperationalDate
	valid_until: OperationalDate
}

export interface CreateValidationDto extends Omit<z.infer<typeof CreateValidationSchema>, 'valid_from' | 'valid_until'> {
	valid_from: OperationalDate
	valid_until: OperationalDate
}

export type UpdateValidationDto = Partial<CreateValidationDto>;
