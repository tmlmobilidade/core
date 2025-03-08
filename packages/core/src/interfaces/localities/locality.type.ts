/* * */

import { DocumentSchema } from '@/types/common';
import { GeoJSON } from 'geojson';
import z from 'zod';

/* * */

export const LocalitySchema = DocumentSchema.extend({
	border_color: z.string(),
	border_opacity: z.number(),
	border_width: z.number(),
	code: z.string(),
	district: z.string(),
	fill_color: z.string(),
	fill_opacity: z.number(),
	geojson: z.record(z.any()), // TODO: Validate GeoJSON
	is_locked: z.boolean(),
	name: z.string(),
	prefix: z.string(),
	region: z.string(),
}).strict();

export const CreateLocalitySchema = LocalitySchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateLocalitySchema = CreateLocalitySchema.partial();

export interface Locality extends z.infer<typeof LocalitySchema> {
	geojson: GeoJSON
}
export type CreateLocalityDto = z.infer<typeof CreateLocalitySchema>;
export type UpdateLocalityDto = Partial<CreateLocalityDto>;
