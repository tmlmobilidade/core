/* * */

import { DocumentSchema } from '@/_common/document.js';
import { unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

import { gtfsCauseSchema, gtfsEffectSchema } from './gtfs/cause-effetcs.js';

/* * */

// Define constants for enum values for better maintainability
const PUBLISH_STATUS_VALUES = ['PUBLISHED', 'ARCHIVED', 'DRAFT'] as const;
const ALERT_TYPE_VALUES = ['PLANNED', 'REALTIME'] as const;
const REFERENCE_TYPE_VALUES = ['LINE', 'STOP', 'AGENCY', 'TRIP'] as const;

export const publishStatusSchema = z.enum(PUBLISH_STATUS_VALUES);
export const alertTypeSchema = z.enum(ALERT_TYPE_VALUES);
export const referenceTypeSchema = z.enum(REFERENCE_TYPE_VALUES);

export type PublishStatus = z.infer<typeof publishStatusSchema>;
export type AlertType = z.infer<typeof alertTypeSchema>;
export type ReferenceType = z.infer<typeof referenceTypeSchema>;

/* * */

// Base schema for alerts with common validation rules
export const AlertSchema = DocumentSchema.extend({
	active_period_end_date: unixTimeStampSchema.nullish(),
	active_period_start_date: unixTimeStampSchema,
	cause: gtfsCauseSchema,
	coordinates: z.tuple([z.number(), z.number()]).nullish(),
	created_by: z.string().min(1),
	description: z.string(),
	effect: gtfsEffectSchema,
	file_id: z.string().nullish(),
	info_url: z.string().url().optional().or(z.literal('')),
	modified_by: z.string().min(1),
	municipality_ids: z.array(z.string().min(1)),
	publish_end_date: unixTimeStampSchema.nullish(),
	publish_start_date: unixTimeStampSchema,
	publish_status: publishStatusSchema,
	reference_type: referenceTypeSchema,
	references: z.array(z.object({
		child_ids: z.array(z.string().min(1)),
		parent_id: z.string().min(1),
	})),
	title: z.string().min(1),
	type: alertTypeSchema,
}).strict();

export const CreateAlertSchema = AlertSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateAlertSchema = CreateAlertSchema.omit({ created_by: true }).partial();

// Define the Alert interface
export type Alert = z.infer<typeof AlertSchema>;
export type CreateAlertDto = z.infer<typeof CreateAlertSchema>;
export type UpdateAlertDto = z.infer<typeof UpdateAlertSchema>;

/* * */

export const AlertPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
});

export type AlertPermission = z.infer<typeof AlertPermissionSchema>;

/* * */

export const GetAllAlertsQuerySchema = z.object({
	realtime: z.preprocess(
		(val: string) => val === 'true' || val === '1',
		z.boolean(),
	),
});

export type GetAllAlertsQuery = z.infer<typeof GetAllAlertsQuerySchema>;

/* * */
