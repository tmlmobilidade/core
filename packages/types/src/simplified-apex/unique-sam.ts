/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const UniqueSamSchema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_version: z.string(),
	device_id: z.string(),
	first_transaction_id: z.string(),
	first_transaction_timestamp: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	first_transaction_type: z.enum(['on-board-refund', 'on-board-sale', 'validation', 'location', 'inspection', 'inspection-decision']),
	latest_transaction_id: z.string(),
	latest_transaction_timestamp: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	latest_transaction_type: z.enum(['on-board-refund', 'on-board-sale', 'validation', 'location', 'inspection', 'inspection-decision']),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
}).strict();

export const UpdateUniqueSamSchema = UniqueSamSchema.partial();

/**
 * SAMs are the chips that contain the keys used to sign APEX transactions.
 * They live in the validator machines and produce an incrementing counter value
 * every time a transaction is signed. This counter value is used to ensure that
 * the transactions are real, unique and incremental. This allows the system to
 * detect if a transaction has been tampered with or if any transactions are missing.
 */
export interface UniqueSam extends Omit<z.infer<typeof UniqueSamSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type UpdateUniqueSamDto = Partial<UniqueSam>;
