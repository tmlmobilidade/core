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
	'not_applicable',
	'unknown',
	'is_missing',
	'is_damaged',
	'is_ok',
] as const;

const LIGHTNING_STATUS_VALUES = [
	'confortable',
	'damaged',
	'insuficient',
	'moderate',
	'unavailable',
	'unknown',
] as const;

const PAVEMENT_TYPE_VALUES = [
	'asphalt',
	'concrete',
	'dirt',
	'grass',
	'gravel',
	'portuguese_stones',
	'unknown',
] as const;

const POLE_STATUS_VALUES = [
	'not_applicable',
	'unknown',
	'is_missing',
	'is_damaged',
	'is_ok',
] as const;

const ROAD_TYPE_VALUES = [
	'complementary_itinerary',
	'highway',
	'main_itinerary',
	'national_road',
	'regional_road',
	'secondary_road',
	'unknown',
] as const;

const SHELTER_STATUS_VALUES = [
	'not_applicable',
	'unknown',
	'is_missing',
	'is_damaged',
	'is_ok',
] as const;

const SIDEWALK_TYPE_VALUES = [
	'unknown',
	'none',
	'gutter',
	'inaccessible',
	'is_ok',
] as const;

const CONNECTIONS_VALUES = [
	'ferry',
	'light_rail',
	'subway',
	'train',
	'boat',
	'airport',
	'bike_sharing',
	'bike_parking',
	'car_parking',
] as const;

const FACILITIES_VALUES = [
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
] as const;

//
// Define schemas using constants

export const unixTimeStampSchema = z
	.number()
	.transform(validateUnixTimestamp)
	.brand('UnixTimestamp')
	.nullish();
export const jurisdictionSchema = z.enum(JURISDICTION_VALUES).default('unknown');
export const operationalStatusSchema = z.enum(OPERATIONAL_STATUS_VALUES).default('inactive');
export const benchStatusSchema = z.enum(BENCH_STATUS_VALUES).default('unknown');
export const dockingBayTypeSchema = z.enum(DOCKING_BAY_TYPE_VALUES).default('unknown');
export const electricityStatusSchema = z.enum(ELECTRICITY_STATUS_VALUES).default('unknown');
export const flagStatusSchema = z.enum(FLAG_STATUS_VALUES).default('unknown');
export const lightningStatusSchema = z.enum(LIGHTNING_STATUS_VALUES).default('unknown');
export const pavementTypeSchema = z.enum(PAVEMENT_TYPE_VALUES).default('unknown');
export const poleStatusSchema = z.enum(POLE_STATUS_VALUES).default('unknown');
export const roadTypeSchema = z.enum(ROAD_TYPE_VALUES).default('unknown');
export const shelterStatusSchema = z.enum(SHELTER_STATUS_VALUES).default('unknown');
export const sidewalkTypeSchema = z.enum(SIDEWALK_TYPE_VALUES).default('unknown');
export const connectionsSchema = z.array(z.enum(CONNECTIONS_VALUES)).default([]);
export const facilitiesSchema = z.array(z.enum(FACILITIES_VALUES)).default([]);

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

	lighting_status: lightningStatusSchema,

	pavement_type: pavementTypeSchema,

	pole_status: poleStatusSchema,

	road_type: roadTypeSchema,

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

	shelter_status: shelterStatusSchema,

	sidewalk_type: sidewalkTypeSchema,

	//
	// Checks

	last_infrastructure_check: unixTimeStampSchema,

	last_infrastructure_maintenance: unixTimeStampSchema,

	last_schedules_check: unixTimeStampSchema,

	last_schedules_maintenance: unixTimeStampSchema,

	//
	// Facilities

	connections: connectionsSchema,

	facilities: facilitiesSchema,

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
export type LightningStatus = z.infer<typeof lightningStatusSchema>;
export type PavementType = z.infer<typeof pavementTypeSchema>;
export type PoleStatus = z.infer<typeof poleStatusSchema>;
export type RoadType = z.infer<typeof roadTypeSchema>;
export type ShelterStatus = z.infer<typeof shelterStatusSchema>;
export type SidewalkType = z.infer<typeof sidewalkTypeSchema>;
export type Connections = z.infer<typeof connectionsSchema>;
export type Facilities = z.infer<typeof facilitiesSchema>;

export type Stop = Omit<z.infer<typeof StopSchema>, 'created_at' | 'updated_at'> & {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
};
export type CreateStopDto = Omit<z.infer<typeof CreateStopSchema>, 'created_at' | 'updated_at'> & {
	created_at?: UnixTimestamp
	updated_at?: UnixTimestamp
};
export type UpdateStopDto = Partial<CreateStopDto>;
