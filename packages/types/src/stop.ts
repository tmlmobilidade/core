/* * */

import { CommentSchema, DocumentSchema, UnixTimestamp, validateUnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

//
// Define constants for enum values for better maintainability

const JURISDICTION_VALUES = [
	'ip',
	'municipality',
	'other',
	'unknown',
] as const;

const OPERATIONAL_STATUS_VALUES = [
	'active',
	'inactive',
	'provisional',
	'seasonal',
	'voided',
] as const;

const BENCH_STATUS_VALUES = [
	'not_applicable',
	'unknown',
	'is_missing',
	'is_damaged',
	'is_ok',
] as const;

const DOCKING_BAY_TYPE_VALUES = [
	'unknown',
	'simple_interaction',
	'cut_in_road_without_marks',
	'cut_in_road_with_marks',
	'island',
	'peninsula',
] as const;

const ELECTRICITY_STATUS_VALUES = [
	'available',
	'unavailable',
	'unknown',
] as const;

const FLAG_STATUS_VALUES = [
	'not_applicable', 'unknown', 'is_missing', 'is_damaged', 'is_ok',
] as const;

//
// Define schemas using constants

export const jurisdictionSchema = z.enum(JURISDICTION_VALUES).default('unknown');
export const operationalStatusSchema = z.enum(OPERATIONAL_STATUS_VALUES).default('inactive');
export const benchStatusSchema = z.enum(BENCH_STATUS_VALUES).default('unknown');
export const dockingBayTypeSchema = z.enum(DOCKING_BAY_TYPE_VALUES).default('unknown');
export const electricityStatusSchema = z.enum(ELECTRICITY_STATUS_VALUES).default('unknown');
export const flagStatusSchema = z.enum(FLAG_STATUS_VALUES).default('unknown');

export const StopSchema = DocumentSchema.extend({

	//
	// General

	_id: z
		.string()
		.length(6),

	is_archived: z
		.boolean()
		.default(false),

	is_locked: z
		.boolean()
		.default(false),

	jurisdiction: jurisdictionSchema,

	name: z
		.string(),

	new_name: z
		.string(),

	operational_status: operationalStatusSchema,

	short_name: z
		.string()
		.nullish(),

	tts_name: z
		.string()
		.nullish(),

	//
	// Location

	district_id: z
		.string(),

	latitude: z
		.number(),

	locality_id: z
		.string()
		.nullish(),

	longitude: z
		.number(),

	municipality_id: z
		.string(),

	parish_id: z
		.string()
		.nullish(),

	//
	// Infrastructure

	bench_status: benchStatusSchema,

	docking_bay_type: dockingBayTypeSchema,

	electricity_status: electricityStatusSchema,

	flag_status: flagStatusSchema,

	lighting_status: z
		.enum(['confortable', 'damaged', 'insuficient', 'moderate', 'unavailable', 'unknown'])
		.default('unknown'),

	pavement_type: z
		.enum(['asphalt', 'concrete', 'dirt', 'grass', 'gravel', 'portuguese_stones', 'unknown'])
		.default('unknown'),

	pole_status: z
		.enum(['not_applicable', 'unknown', 'is_missing', 'is_damaged', 'is_ok'])
		.default('unknown'),

	road_type: z
		.enum(['complementary_itinerary', 'highway', 'main_itinerary', 'national_road', 'regional_road', 'secondary_road', 'unknown'])
		.default('unknown'),

	shelter_code: z
		.string()
		.nullish(),

	shelter_maintainer: z
		.string()
		.nullish(),

	shelter_make: z
		.string()
		.nullish(),

	shelter_model: z
		.string()
		.nullish(),

	shelter_status: z
		.enum(['not_applicable', 'unknown', 'is_missing', 'is_damaged', 'is_ok'])
		.default('unknown'),

	sidewalk_type: z
		.enum(['unknown', 'none', 'gutter', 'inaccessible', 'is_ok'])
		.default('unknown'),

	//
	// Checks

	last_infrastructure_check: z
		.number()
		.transform(validateUnixTimestamp)
		.brand('UnixTimestamp')
		.nullish(),

	last_infrastructure_maintenance: z
		.number()
		.transform(validateUnixTimestamp)
		.brand('UnixTimestamp')
		.nullish(),

	last_schedules_check: z
		.number()
		.transform(validateUnixTimestamp)
		.brand('UnixTimestamp')
		.nullish(),

	last_schedules_maintenance: z
		.number()
		.transform(validateUnixTimestamp)
		.brand('UnixTimestamp')
		.nullish(),

	//
	// Facilities

	connections: z
		.array(z.enum([
			'ferry',
			'light_rail',
			'subway',
			'train',
			'boat',
			'airport',
			'bike_sharing',
			'bike_parking',
			'car_parking',
		]))
		.default([]),

	facilities: z
		.array(z.enum([
			'fire_station',
			'health_clinic',
			'historic_building',
			'hospital',
			'police_station',
			'school',
			'shopping',
			'transit_office',
			'university',
			'pip',
		]))
		.default([]),

	//
	// Images & Files

	file_ids: z
		.array(z.string())
		.default([]),

	image_ids: z
		.array(z.string())
		.default([]),

	//
	// Notes & Comments

	comments: z
		.array(CommentSchema)
		.default([]),

	observations: z
		.string()
		.nullish(),

}).strict();

export const CreateStopSchema = StopSchema;
export const UpdateStopSchema = CreateStopSchema.partial();

//
// Define types based on schemas

export type Jurisdiction = z.infer<typeof jurisdictionSchema>;
export type OperationalStatus = z.infer<typeof operationalStatusSchema>;
export type BenchStatus = z.infer<typeof benchStatusSchema>;
export type DockingBayType = z.infer<typeof dockingBayTypeSchema>;
export type ElectricityStatus = z.infer<typeof electricityStatusSchema>;
export type FlagStatus = z.infer<typeof flagStatusSchema>;

export type Stop = Omit<z.infer<typeof StopSchema>, 'created_at' | 'updated_at'> & {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
};
export type CreateStopDto = Omit<z.infer<typeof CreateStopSchema>, 'created_at' | 'updated_at'> & {
	created_at?: UnixTimestamp
	updated_at?: UnixTimestamp
};
export type UpdateStopDto = Partial<CreateStopDto>;
