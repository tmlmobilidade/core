/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { GtfsAgencySchema, GtfsFeedInfoSchema } from '@/gtfs.js';
import { z } from 'zod';

/* * */

const FEEDER_STATUS = ['waiting', 'processing', 'success', 'error'] as const;
export const FeederStatusSchema = z.enum(FEEDER_STATUS);

export const PlanSchema = DocumentSchema.extend({
	feeder_status: FeederStatusSchema,
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

export type FeederStatus = z.infer<typeof FeederStatusSchema>;

export interface Plan extends Omit<z.infer<typeof PlanSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type CreatePlanDto = z.infer<typeof CreatePlanSchema>;
export type UpdatePlanDto = Partial<Plan>;
