/* * */

import { DocumentSchema } from '@/common/document.js';
import { type OperationalDate, validateOperationalDate } from '@/common/operational-date.js';
import { type UnixTimestamp } from '@/common/unix-timestamp.js';
import { z } from 'zod';

/* * */

const FEEDER_STATUS = ['waiting', 'processing', 'success', 'error'] as const;
export const FeederStatusSchema = z.enum(FEEDER_STATUS);

export const PlanSchema = DocumentSchema.extend({
	agency_id: z.string(),
	feeder_status: FeederStatusSchema,
	is_approved: z.boolean(),
	is_locked: z.boolean(),
	operation_file: z.string().nullish(),
	reference_file: z.string().nullish(),
	valid_from: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	valid_until: z.string().transform(validateOperationalDate).brand('OperationalDate'),
}).strict();

export const CreatePlanSchema = PlanSchema.omit({ _id: true, created_at: true, updated_at: true });

export const UpdatePlanSchema = CreatePlanSchema.partial();

/* * */

export type FeederStatus = z.infer<typeof FeederStatusSchema>;

export interface Plan extends Omit<z.infer<typeof PlanSchema>, 'created_at' | 'updated_at' | 'valid_from' | 'valid_until'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
	valid_from: OperationalDate
	valid_until: OperationalDate
}

export interface CreatePlanDto extends Omit<z.infer<typeof CreatePlanSchema>, 'valid_from' | 'valid_until'> {
	valid_from: OperationalDate
	valid_until: OperationalDate
}

export type UpdatePlanDto = Partial<CreatePlanDto>;
