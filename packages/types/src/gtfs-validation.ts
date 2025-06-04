/* * */

import { z } from 'zod';

import { DocumentSchema } from './_common/document.js';
import { UnixTimestamp } from './_common/unix-timestamp.js';
import { GtfsFeedInfo, GtfsFeedInfoSchema } from './gtfs.js';
import { FeederStatusSchema } from './plan.js';

/* * */

/* SUMMARY */

export const SEVERITY_LEVELS = ['error', 'warning', 'info'] as const;
export const SeverityLevelSchema = z.enum(SEVERITY_LEVELS);
export type SeverityLevel = z.infer<typeof SeverityLevelSchema>;

export const GTFSValidatorMessageSchema = z.object({
	field: z.string(),
	file_name: z.string(),
	message: z.string(),
	rows: z.array(z.number()),
	severity: SeverityLevelSchema,
	validation_id: z.string(),
});

export const GTFSValidatorSummarySchema = z.object({
	messages: z.array(GTFSValidatorMessageSchema),
	total_errors: z.number(),
	total_warnings: z.number(),
});

export type GTFSValidatorSummary = z.infer<typeof GTFSValidatorSummarySchema>;
export type GTFSValidatorMessage = z.infer<typeof GTFSValidatorMessageSchema>;

/* VALIDATION */

export const ValidationSchema = DocumentSchema.extend({
	agency_id: z.string(),
	feeder_status: FeederStatusSchema,
	file_id: z.string().nullish(),
	gtfs_feed_info: GtfsFeedInfoSchema.nullish(),
	summary: GTFSValidatorSummarySchema.nullish(),
}).strict();

export const CreateValidationSchema = ValidationSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateValidationSchema = CreateValidationSchema.partial();

export interface Validation extends Omit<z.infer<typeof ValidationSchema>, 'created_at' | 'gtfs_feed_info' | 'summary' | 'updated_at'> {
	created_at: UnixTimestamp
	gtfs_feed_info?: GtfsFeedInfo
	summary?: GTFSValidatorSummary
	updated_at: UnixTimestamp
}

export interface CreateValidationDto extends Omit<z.infer<typeof CreateValidationSchema>, 'gtfs_feed_info' | 'summary'> {
	gtfs_feed_info?: GtfsFeedInfo
	summary?: GTFSValidatorSummary
}

export type UpdateValidationDto = Partial<CreateValidationDto>;
