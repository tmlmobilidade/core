/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { type GtfsAgency, GtfsAgencySchema, type GtfsFeedInfo, GtfsFeedInfoSchema } from '@/gtfs.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

/* SUMMARY */

export const SEVERITY_LEVELS = ['error', 'warning', 'ignore', 'forbidden'] as const;
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

export const GtfsValidationSchema = DocumentSchema.extend({
	feeder_status: ProcessingStatusSchema,
	file_id: z.string(),
	gtfs_agency: GtfsAgencySchema,
	gtfs_feed_info: GtfsFeedInfoSchema,
	notification_sent: z.boolean().default(false),
	summary: GTFSValidatorSummarySchema.nullish(),
}).strict();

export const CreateGtfsValidationSchema = GtfsValidationSchema.omit({
	_id: true,
	created_at: true,
	updated_at: true,
});

export const UpdateGtfsValidationSchema = CreateGtfsValidationSchema.partial();

export interface GtfsValidation extends Omit<z.infer<typeof GtfsValidationSchema>, 'created_at' | 'gtfs_agency' | 'gtfs_feed_info' | 'summary' | 'updated_at'> {
	created_at: UnixTimestamp
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
	summary?: GTFSValidatorSummary
	updated_at: UnixTimestamp
}

export interface CreateGtfsValidationDto extends Omit<z.infer<typeof CreateGtfsValidationSchema>, 'gtfs_agency' | 'gtfs_feed_info'> {
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
}

export type UpdateGtfsValidationDto = Partial<CreateGtfsValidationDto>;

/* * */

export const GtfsValidationPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
	municipality_ids: z.array(z.string()),
});

export type GtfsValidationPermission = z.infer<typeof GtfsValidationPermissionSchema>;
