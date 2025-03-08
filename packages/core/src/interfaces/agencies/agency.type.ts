/* * */

import { DocumentSchema, type OperationalDate, type UnixTimestamp } from '@/types/common';
import { validateOperationalDate } from '@/utils';
import z from 'zod';

/* * */

export const AgencySchema = DocumentSchema.extend({
	code: z.string(),
	email: z.string().email(),
	fare_url: z.string().url(),
	is_locked: z.boolean(),
	lang: z.string(),
	name: z.string(),
	operation_start_date: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	phone: z.string(),
	price_per_km: z.number(),
	timezone: z.string(),
	total_vkm_per_year: z.number(),
	url: z.string().url(),
}).strict();

export const CreateAgencySchema = AgencySchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateAgencySchema = CreateAgencySchema.partial();

/* * */

export interface Agency extends Omit<z.infer<typeof AgencySchema>, 'created_at' | 'operation_start_date' | 'updated_at'> {
	created_at: UnixTimestamp
	operation_start_date: OperationalDate
	updated_at: UnixTimestamp
}
export interface CreateAgencyDto extends Omit<z.infer<typeof CreateAgencySchema>, 'operation_start_date'> {
	operation_start_date: OperationalDate
}
export type UpdateAgencyDto = Partial<CreateAgencyDto>;
