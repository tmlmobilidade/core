/* * */

import { DocumentSchema } from '@/_common/document.js';
import { unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

// Define constants for enum values for better maintainability
const CAUSE_VALUES = ['ACCIDENT', 'CONSTRUCTION', 'DEMONSTRATION', 'HOLIDAY', 'MAINTENANCE', 'MEDICAL_EMERGENCY', 'OTHER_CAUSE', 'POLICE_ACTIVITY', 'STRIKE', 'TECHNICAL_PROBLEM', 'UNKNOWN_CAUSE', 'WEATHER'] as const;
const EFFECT_VALUES = ['ACCESSIBILITY_ISSUE', 'ADDITIONAL_SERVICE', 'DETOUR', 'MODIFIED_SERVICE', 'NO_EFFECT', 'NO_SERVICE', 'OTHER_EFFECT', 'REDUCED_SERVICE', 'SIGNIFICANT_DELAYS', 'STOP_MOVED', 'UNKNOWN_EFFECT'] as const;
const PUBLISH_STATUS_VALUES = ['PUBLISHED', 'ARCHIVED', 'DRAFT'] as const;
const ALERT_TYPE_VALUES = ['PLANNED', 'REALTIME'] as const;
const REFERENCE_TYPE_VALUES = ['LINE', 'STOP', 'AGENCY', 'TRIP'] as const;

export const causeSchema = z.enum(CAUSE_VALUES);
export const effectSchema = z.enum(EFFECT_VALUES);
export const publishStatusSchema = z.enum(PUBLISH_STATUS_VALUES);
export const alertTypeSchema = z.enum(ALERT_TYPE_VALUES);
export const referenceTypeSchema = z.enum(REFERENCE_TYPE_VALUES);

export type Cause = z.infer<typeof causeSchema>;
export type Effect = z.infer<typeof effectSchema>;
export type PublishStatus = z.infer<typeof publishStatusSchema>;
export type AlertType = z.infer<typeof alertTypeSchema>;
export type ReferenceType = z.infer<typeof referenceTypeSchema>;

/* * */

// Base schema for alerts with common validation rules
export const AlertSchema = DocumentSchema.extend({
	active_period_end_date: unixTimeStampSchema.nullish(),
	active_period_start_date: unixTimeStampSchema,
	cause: causeSchema,
	coordinates: z.tuple([z.number(), z.number()]).nullish(),
	created_by: z.string().min(1),
	description: z.string(),
	effect: effectSchema,
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
export const UpdateAlertSchema = CreateAlertSchema.partial();

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
