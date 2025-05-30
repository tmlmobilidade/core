/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

import { CommentSchema } from './common/comment.js';

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
export const commentSchema = z.array(CommentSchema).default([]);

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

	last_infrastructure_check: unixTimeStampSchema.nullish(),

	last_infrastructure_maintenance: unixTimeStampSchema.nullish(),

	last_schedules_check: unixTimeStampSchema.nullish(),

	last_schedules_maintenance: unixTimeStampSchema.nullish(),

	last_shelter_installation: unixTimeStampSchema.nullish(),

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

	comments: commentSchema,

	observations: z
		.string()
		.nullish(),

}).strict();

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
export type Comment = z.infer<typeof commentSchema>;

export const CreateStopSchema = StopSchema
	.omit({ created_at: true, updated_at: true });

export const UpdateStopSchema = StopSchema
	.omit({ _id: true, created_at: true, updated_at: true })
	.partial();

//
// Define the Stop interface

export interface Stop
	extends Omit<
		z.infer<typeof StopSchema>,
		'affectation'
		| 'bench_status'
		| 'comments'
		| 'created_at'
		| 'district_id'
		| 'docking_bay_type'
		| 'electricity_status'
		| 'facilities'
		| 'file_ids'
		| 'flag_status'
		| 'image_ids'
		| 'is_archived'
		| 'is_locked'
		| 'jurisdiction'
		| 'last_infrastructure_check'
		| 'last_infrastructure_maintenance'
		| 'last_schedules_check'
		| 'last_schedules_maintenance'
		| 'last_shelter_installation'
		| 'latitude'
		| 'lighting_status'
		| 'locality_id'
		| 'longitude'
		| 'municipality_id'
		| 'name'
		| 'new_name'
		| 'observations'
		| 'operational_status'
		| 'parish_id'
		| 'pavement_type'
		| 'pole_status'
		| 'road_type'
		| 'shelter_code'
		| 'shelter_maintainer'
		| 'shelter_make'
		| 'shelter_model'
		| 'shelter_status'
		| 'short_name'
		| 'sidewalk_type'
		| 'tts_name'
		| 'updated_at'
	> {
	affectation: string[]
	bench_status: BenchStatus
	comments: Comment[]
	created_at: UnixTimestamp
	district_id: string
	docking_bay_type: DockingBayType
	electricity_status: ElectricityStatus
	facilities: Facilities
	file_ids: string[]
	flag_status: FlagStatus
	image_ids: string[]
	is_archived: boolean
	is_locked: boolean
	jurisdiction: Jurisdiction
	last_infrastructure_check: UnixTimestamp
	last_infrastructure_maintenance: UnixTimestamp
	last_schedules_check: UnixTimestamp
	last_schedules_maintenance:	UnixTimestamp
	last_shelter_installation:	UnixTimestamp
	latitude: number
	lighting_status: LightningStatus
	locality_id: string
	longitude: number
	municipality_id: string
	name: string
	new_name: string
	observations: string
	operational_status: OperationalStatus
	parish_id: string
	pavement_type: PavementType
	pole_status: PoleStatus
	road_type: RoadType
	shelter_code: string
	shelter_maintainer: string
	shelter_make: string
	shelter_model: string
	shelter_status: ShelterStatus
	short_name: string
	sidewalk_type: SidewalkType
	tts_name: string
	updated_at: UnixTimestamp
}

export interface CreateStopDto
	extends Omit<
		z.infer<typeof CreateStopSchema>,
		'affectation'
		| 'bench_status'
		| 'comments'
		| 'district_id'
		| 'docking_bay_type'
		| 'electricity_status'
		| 'facilities'
		| 'file_ids'
		| 'flag_status'
		| 'image_ids'
		| 'is_archived'
		| 'is_locked'
		| 'jurisdiction'
		| 'last_infrastructure_check'
		| 'last_infrastructure_maintenance'
		| 'last_schedules_check'
		| 'last_schedules_maintenance'
		| 'last_shelter_installation'
		| 'latitude'
		| 'lighting_status'
		| 'locality_id'
		| 'longitude'
		| 'municipality_id'
		| 'name'
		| 'new_name'
		| 'observations'
		| 'operational_status'
		| 'parish_id'
		| 'pavement_type'
		| 'pole_status'
		| 'road_type'
		| 'shelter_code'
		| 'shelter_maintainer'
		| 'shelter_make'
		| 'shelter_model'
		| 'shelter_status'
		| 'short_name'
		| 'sidewalk_type'
		| 'tts_name'
	> {
	affectation: string[]
	bench_status: BenchStatus
	comments: Comment[]
	district_id: string
	docking_bay_type: DockingBayType
	electricity_status: ElectricityStatus
	facilities: Facilities
	file_ids: string[]
	flag_status: FlagStatus
	image_ids: string[]
	is_archived: boolean
	is_locked: boolean
	jurisdiction: Jurisdiction
	last_infrastructure_check: UnixTimestamp
	last_infrastructure_maintenance: UnixTimestamp
	last_schedules_check: UnixTimestamp
	last_schedules_maintenance:	UnixTimestamp
	last_shelter_installation:	UnixTimestamp
	latitude: number
	lighting_status: LightningStatus
	locality_id: string
	longitude: number
	municipality_id: string
	name: string
	new_name: string
	observations: string
	operational_status: OperationalStatus
	parish_id: string
	pavement_type: PavementType
	pole_status: PoleStatus
	road_type: RoadType
	shelter_code: string
	shelter_maintainer: string
	shelter_make: string
	shelter_model: string
	shelter_status: ShelterStatus
	short_name: string
	sidewalk_type: SidewalkType
	tts_name: string
}

export type UpdateStopDto = Partial<Omit<CreateStopDto, 'created_by'>>;
