/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

//
// Define constants for enum values for better maintainability

const GEOMETRY_VALYES = [
	'coordinates', // Array of Array of longitude and latitude pairs
	'type',
] as const;

const PROPERTIES_VALUES = [
	'area_ha', // Number
	'district_id', // String
	'id', // String
	'name', // String
] as const;

//
// Define schemas using constants

export const geometrySchema = z.enum(GEOMETRY_VALYES);
export const propertiesSchema = z.enum(PROPERTIES_VALUES);

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

export const StopPermissionSchema = z.object({
	agency_ids: z.array(z.string()),
	municipality_ids: z.array(z.string()),
});

export type StopPermission = z.infer<typeof StopPermissionSchema>;
