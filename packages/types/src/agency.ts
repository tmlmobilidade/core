/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type OperationalDate, validateOperationalDate } from '@/_common/operational-date.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const AgencySchema = DocumentSchema.extend({
	contact_emails_pta: z.array(z.string().email()).default([]),
	contact_emails_pto: z.array(z.string().email()).default([]),
	fare_url: z.string().url(),
	financials: z.object({
		price_per_km: z.number(),
		total_vkm_per_year: z.number(),
	}),
	name: z.string(),
	operation_start_date: z.string().transform(validateOperationalDate).brand('OperationalDate'),
	phone: z.string(),
	public_email: z.string().email(),
	short_name: z.string(),
	timezone: z.string().default('Europe/Lisbon'),
	website_url: z.string().url(),
}).strict();

export const CreateAgencySchema = AgencySchema.omit({ created_at: true, updated_at: true });
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

/* * */

export const AgencyPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
	municipality_ids: z.array(z.string()),
});

export type AgencyPermission = z.infer<typeof AgencyPermissionSchema>;
