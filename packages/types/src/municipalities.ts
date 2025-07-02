/* * */

import { DocumentSchema } from '@/_common/document.js';
import { Geometry, geometrySchema } from '@/_common/geometry.js';
import { Properties, propertiesSchema } from '@/_common/properties.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

// Define schemas using constants

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
