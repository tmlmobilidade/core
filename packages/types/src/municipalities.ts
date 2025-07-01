/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

// Define schemas using constants

export const geometrySchema = z.object({
	coordinates: z.array(z.array(z.number())),
	type: z.string(),
});

export const propertiesSchema = z.object({
	area_ha: z.number(),
	district_id: z.string().length(2),
	id: z.string().length(4),
	name: z.string(),
});

export const MunicipalitySchema = DocumentSchema.extend({

	//
	// General

	_id: z
		.string()
		.length(4),

	geometry: geometrySchema,

	properties: propertiesSchema,

	type: z
		.string(),
}).strict();

//
// Define types based on schemas

export type Geometry = z.infer<typeof geometrySchema>;
export type Properties = z.infer<typeof propertiesSchema>;

export const CreateMunicipalitySchema = MunicipalitySchema
	.omit({ created_at: true, updated_at: true });

export const UpdateMunicipalitySchema = MunicipalitySchema
	.omit({ _id: true, created_at: true, updated_at: true })
	.partial();

//
// Define the Municipality interface

export interface Municipality
	extends Omit<
		z.infer<typeof MunicipalitySchema>,
		'created_at'
		| 'geometry'
		| 'properties'
		| 'updated_at'
	> {
	created_at: UnixTimestamp
	geometry: Geometry
	properties: Properties
	updated_at: UnixTimestamp

}

export interface CreateMunicipalityDto
	extends Omit<
		z.infer<typeof CreateMunicipalitySchema>,
		'geometry'
		| 'properties'
	> {
	geometry: Geometry
	properties: Properties
}

export type UpdateMunicipalityDto = Partial<Omit<CreateMunicipalityDto, 'created_by'>>;

/* * */

export type GeometrySchema = z.infer<typeof geometrySchema>;
export type PropertiesSchema = z.infer<typeof propertiesSchema>;
