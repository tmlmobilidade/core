/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

import { GtfsAgency, GtfsAgencySchema, GtfsFeedInfo, GtfsFeedInfoSchema } from './gtfs.js';

/* * */

const FEEDER_STATUS = ['waiting', 'processing', 'success', 'error'] as const;
export const FeederStatusSchema = z.enum(FEEDER_STATUS);

export const PlanSchema = DocumentSchema.extend({
	file_id: z.string(),
	gtfs_agency: GtfsAgencySchema,
	gtfs_feed_info: GtfsFeedInfoSchema,
	is_approved: z.boolean().default(false),
	is_locked: z.boolean().default(false),
	validation_id: z.string(),
}).strict();

export const CreatePlanSchema = z.object({
	validation_id: z.string(),
});
export const UpdatePlanSchema = PlanSchema.partial();

/* * */

export type FeederStatus = z.infer<typeof FeederStatusSchema>;

export interface Plan extends Omit<z.infer<typeof PlanSchema>, 'created_at' | 'gtfs_agency' | 'gtfs_feed_info' | 'updated_at'> {
	created_at: UnixTimestamp
	gtfs_agency: GtfsAgency
	gtfs_feed_info: GtfsFeedInfo
	updated_at: UnixTimestamp
}

export type CreatePlanDto = z.infer<typeof CreatePlanSchema>;
export type UpdatePlanDto = Partial<Plan>;
