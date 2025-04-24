/* * */

import { DocumentSchema, type OperationalDate, type UnixTimestamp, validateOperationalDate } from '@/common.js';
import { z } from 'zod';

import { FeederStatusSchema } from './plan.js';

/* * */

export const ValidationSchema = DocumentSchema.extend({
	agency_id: z.string(),
	feeder_status: FeederStatusSchema,
	file: z.string().nullish(),
	is_locked: z.boolean(),
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
