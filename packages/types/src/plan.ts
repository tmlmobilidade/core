/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatus } from '@/_common/system.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { GtfsAgency, GtfsAgencySchema, GtfsFeedInfo, GtfsFeedInfoSchema } from '@/gtfs.js';
import { z } from 'zod';

/* * */

export const PlanSchema = DocumentSchema.extend({
	feeder_status: z.nativeEnum(ProcessingStatus).default(ProcessingStatus.Waiting),
	gtfs_agency: GtfsAgencySchema,
	gtfs_feed_info: GtfsFeedInfoSchema,
	is_approved: z.boolean().default(false),
	is_locked: z.boolean().default(false),
	operation_file_id: z.string(),
	validation_id: z.string(),
}).strict();

export const CreatePlanSchema = z.object({
	validation_id: z.string(),
});

export const UpdatePlanSchema = PlanSchema.partial();

/* * */

export interface Plan extends Omit<z.infer<typeof PlanSchema>, 'created_at' | 'gtfs_agency' | 'gtfs_feed_info' | 'updated_at'> {
	created_at: UnixTimestamp
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
	updated_at: UnixTimestamp
}

export type CreatePlanDto = z.infer<typeof CreatePlanSchema>;
export type UpdatePlanDto = Partial<Plan>;

/* * */

export const PlanPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
	end_date: z.string(),
	start_date: z.string(),
});

export type PlanPermission = z.infer<typeof PlanPermissionSchema>;
