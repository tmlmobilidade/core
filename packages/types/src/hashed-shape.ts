/* * */

import { DocumentSchema, type UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const HashedShapePointSchema = z.object({
	shape_dist_traveled: z.number(),
	shape_pt_lat: z.number(),
	shape_pt_lon: z.number(),
	shape_pt_sequence: z.number(),
}).strict();

export const CreateHashedShapePointSchema = HashedShapePointSchema;
export const UpdateHashedShapePointSchema = CreateHashedShapePointSchema.partial();

export type HashedShapePoint = z.infer<typeof HashedShapePointSchema>;
export type CreateHashedShapePointDto = z.infer<typeof CreateHashedShapePointSchema>;
export type UpdateHashedShapePointDto = Partial<CreateHashedShapePointDto>;

/* * */

export const HashedShapeSchema = DocumentSchema.extend({
	agency_id: z.string(),
	points: z.array(HashedShapePointSchema),
}).strict();

export const CreateHashedShapeSchema = HashedShapeSchema.partial({ _id: true }).omit({ created_at: true, updated_at: true });
export const UpdateHashedShapeSchema = CreateHashedShapeSchema.partial();

export interface HashedShape extends Omit<z.infer<typeof HashedShapeSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}
export type CreateHashedShapeDto = z.infer<typeof CreateHashedShapeSchema>;
export type UpdateHashedShapeDto = Partial<CreateHashedShapeDto>;
