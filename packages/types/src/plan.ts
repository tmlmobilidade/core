/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { GtfsAgency, GtfsAgencySchema, GtfsFeedInfo, GtfsFeedInfoSchema } from '@/gtfs.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const PlanSchema = DocumentSchema.extend({
	gtfs_agency: GtfsAgencySchema,
	gtfs_feed_info: GtfsFeedInfoSchema,
	hash: z.string(),
	is_locked: z.boolean().default(false),
	operation_file_id: z.string(),
	status_controller: ProcessingStatusSchema.default('waiting'),
	status_merger: ProcessingStatusSchema.default('waiting'),
}).strict();

export const CreatePlanSchema = PlanSchema.omit({
	_id: true,
	created_at: true,
	updated_at: true,
});

export const UpdatePlanSchema = CreatePlanSchema.partial();

/* * */

export interface Plan extends Omit<z.infer<typeof PlanSchema>, 'created_at' | 'gtfs_agency' | 'gtfs_feed_info' | 'updated_at'> {
	created_at: UnixTimestamp
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
	updated_at: UnixTimestamp
}

export interface CreatePlanDto extends Omit<z.infer<typeof CreatePlanSchema>, 'gtfs_agency' | 'gtfs_feed_info'> {
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
}

export type UpdatePlanDto = Partial<CreatePlanDto>;

/* * */

export interface HashablePlanMetadata {
	_id: Plan['_id']
	gtfs_agency: Plan['gtfs_agency']
	gtfs_feed_info: Plan['gtfs_feed_info']
	operation_file_id: Plan['operation_file_id']
}

/* * */

export const PlanPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
	end_date: z.string(),
	start_date: z.string(),
});

export type PlanPermission = z.infer<typeof PlanPermissionSchema>;
