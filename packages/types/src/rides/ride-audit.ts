/* * */

import { DocumentSchema } from '@/_common/document.js';
import { RideAnalysisSchema } from '@/rides/ride-analysis.js';
import { RideJustificationSchema } from '@/rides/ride-justification.js';
import { z } from 'zod';

/* * */

export const RideAuditSchema = DocumentSchema.extend({
	analysis: RideAnalysisSchema,
	is_locked: z.boolean().default(false),
	justification: RideJustificationSchema,
	ride_id: z.string(),
}).strict();

export const CreateRideAuditSchema = RideAuditSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateRideAuditSchema = CreateRideAuditSchema.partial();

/* * */

export type RideAudit = z.infer<typeof RideAuditSchema>;
export type CreateRideAuditDto = z.infer<typeof CreateRideAuditSchema>;
export type UpdateRideAuditDto = z.infer<typeof UpdateRideAuditSchema>;
