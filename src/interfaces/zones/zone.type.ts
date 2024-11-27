import type { GeoJSON } from 'geojson';

import { DocumentSchema } from '@/types/common';
import z from 'zod';

export const ZoneSchema = DocumentSchema.extend({
	border_color: z.string(),
	border_opacity: z.number(),
	border_width: z.number(),
	code: z.string(),
	created_at: z.date(),
	fill_color: z.string(),
	fill_opacity: z.number(),
	geojson: z.record(z.any()), // TODO: Validate GeoJSON
	is_locked: z.boolean(),
	name: z.string(),
}).strict();

export const CreateZoneSchema = ZoneSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateZoneSchema = CreateZoneSchema.partial();

export type Zone = { geojson: GeoJSON } & Omit<z.infer<typeof ZoneSchema>, 'geojson'>;
export type CreateZoneDto = { geojson: GeoJSON } & Omit<z.infer<typeof CreateZoneSchema>, 'geojson'>;
export type UpdateZoneDto = Partial<CreateZoneDto>;
