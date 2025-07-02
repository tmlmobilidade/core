/* * */

import { DocumentSchema } from '@/_common/document.js';
import { Geometry, geometrySchema } from '@/_common/geometry.js';
import { Properties, propertiesSchema } from '@/_common/properties.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

// Define schemas using constants

export const LocalitySchema = DocumentSchema.extend({

	//
	// General

	_id: z
		.string()
		.length(6),

	geometry: geometrySchema,

	properties: propertiesSchema,

	type: z
		.string(),
}).strict();

//
// Define types based on schemas

export const CreateLocalitySchema = LocalitySchema
	.omit({ created_at: true, updated_at: true });

export const UpdateLocalitySchema = LocalitySchema
	.omit({ _id: true, created_at: true, updated_at: true })
	.partial();

//
// Define the Locality interface

export interface Locality
	extends Omit<
		z.infer<typeof LocalitySchema>,
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

export interface CreateLocalityDto
	extends Omit<
		z.infer<typeof CreateLocalitySchema>,
		'geometry'
		| 'properties'
	> {
	geometry: Geometry
	properties: Properties
}

export type UpdateLocalityDto = Partial<Omit<CreateLocalityDto, 'created_by'>>;
