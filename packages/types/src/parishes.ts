/* * */

import { DocumentSchema } from '@/_common/document.js';
import { Geometry, geometrySchema } from '@/_common/geometry.js';
import { Properties, propertiesSchema } from '@/_common/properties.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

// Define schemas using constants

export const ParishSchema = DocumentSchema.extend({

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

export const CreateParishSchema = ParishSchema
	.omit({ created_at: true, updated_at: true });

export const UpdateParishSchema = ParishSchema
	.omit({ _id: true, created_at: true, updated_at: true })
	.partial();

//
// Define the Parish interface

export interface Parish
	extends Omit<
		z.infer<typeof ParishSchema>,
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

export interface CreateParishDto
	extends Omit<
		z.infer<typeof CreateParishSchema>,
		'geometry'
		| 'properties'
	> {
	geometry: Geometry
	properties: Properties
}

export type UpdateParishDto = Partial<Omit<CreateParishDto, 'created_by'>>;
