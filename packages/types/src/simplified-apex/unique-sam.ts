/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const UniqueSamSchema = DocumentSchema.extend({
	agency_id: z.string(),
	device_id: z.string(),
	latest_apex_version: z.string(),
	seen_first_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	seen_last_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	status: z.enum(['missing_transactions', 'complete', 'error', 'pending']).default('pending'),
	status_message: z.string().nullable(),
	transactions_count: z.number().nullable(),
}).strict();

export const CreateUniqueSamSchema = UniqueSamSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateUniqueSamSchema = CreateUniqueSamSchema.partial();

/**
 * SAMs are the chips that contain the keys used to sign APEX transactions.
 * They live in the validator machines and produce an incrementing counter value
 * every time a transaction is signed. This counter value is used to ensure that
 * the transactions are real, unique and incremental. This allows the system to
 * detect if a transaction has been tampered with or if any transactions are missing.
 */
export interface UniqueSam extends Omit<z.infer<typeof UniqueSamSchema>, 'created_at' | 'seen_first_at' | 'seen_last_at' | 'updated_at'> {
	created_at: UnixTimestamp
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
	updated_at: UnixTimestamp
}

export interface CreateUniqueSamDto extends Omit<z.infer<typeof CreateUniqueSamSchema>, 'seen_first_at' | 'seen_last_at'> {
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
}

export type UpdateUniqueSamDto = Partial<CreateUniqueSamDto>;
