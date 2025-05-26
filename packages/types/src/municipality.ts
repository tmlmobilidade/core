/* * */

import { DocumentSchema } from '@/common/document.js';
import { GeoJSON } from 'geojson';
import { z } from 'zod';

/* * */

export const MunicipalitySchema = DocumentSchema.extend({
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

export const CreateMunicipalitySchema = MunicipalitySchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateMunicipalitySchema = CreateMunicipalitySchema.partial();

export interface Municipality extends z.infer<typeof MunicipalitySchema> {
	geojson: GeoJSON
}
export type CreateMunicipalityDto = z.infer<typeof CreateMunicipalitySchema>;
export type UpdateMunicipalityDto = Partial<CreateMunicipalityDto>;
