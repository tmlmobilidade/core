/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

import { SamAnalysis, SamAnalysisSchema } from './sam-analysis.js';

/* * */

export const SamSchema = DocumentSchema.extend({
	_id: z.number(),
	agency_id: z.string(),
	analysis: z.array(SamAnalysisSchema).default([]),
	latest_apex_version: z.string().nullable(),
	remarks: z.string().nullable().default(null),
	seen_first_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	seen_last_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullable(),
	system_status: ProcessingStatusSchema.default('waiting'),
	transactions_expected: z.number().nullable(),
	transactions_found: z.number().nullable(),
	transactions_missing: z.number().nullable(),
}).strict();

export const CreateSamSchema = SamSchema.omit({ created_at: true, updated_at: true });
export const UpdateSamSchema = CreateSamSchema.partial();

/**
 * SAMs are the chips that contain the keys used to sign APEX transactions.
 * They live in the validator machines and produce an incrementing counter value
 * every time a transaction is signed. This counter value is used to ensure that
 * the transactions are real, unique and incremental. This allows the system to
 * detect if a transaction has been tampered with or if any transactions are missing.
 */
export interface Sam extends Omit<z.infer<typeof SamSchema>, 'analysis' | 'created_at' | 'seen_first_at' | 'seen_last_at' | 'updated_at'> {
	analysis: SamAnalysis[]
	created_at: UnixTimestamp
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
	updated_at: UnixTimestamp
}

export interface CreateSamDto extends Omit<z.infer<typeof CreateSamSchema>, 'analysis' | 'seen_first_at' | 'seen_last_at'> {
	analysis: SamAnalysis[]
	seen_first_at: null | UnixTimestamp
	seen_last_at: null | UnixTimestamp
}

export type UpdateSamDto = Partial<CreateSamDto>;
