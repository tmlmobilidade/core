/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatus } from '@/_common/system.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const UniqueSamSchema = DocumentSchema.extend({
	_id: z.number(),
	agency_id: z.string(),
	device_ids: z.array(z.string()).nullable(),
	is_complete: z.boolean().default(false),
	latest_apex_version: z.string().nullable(),
	remarks: z.string().nullable(),
	seen_first_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	seen_last_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	system_status: z.nativeEnum(ProcessingStatus).default(ProcessingStatus.Waiting),
	transactions_expected: z.number().nullable(),
	transactions_found: z.number().nullable(),
	transactions_missing: z.number().nullable(),
	vehicle_ids: z.array(z.string()).nullable(),
}).strict();

export const CreateUniqueSamSchema = UniqueSamSchema.omit({ created_at: true, updated_at: true });
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
