/* * */

import { type GTFSBool } from '@/gtfs/common.js';

/**
 * Represents a trip in the GTFS (General Transit Feed Specification) format.
 * A trip is a sequence of one or more stops that a vehicle makes during its operation.
 * Each trip is associated with a specific route and service schedule.
 * The trip can have various attributes such as headsign, direction, and accessibility options.
 */
export interface GTFS_Trip {
	bikes_allowed: GTFSBool
	block_id?: string
	direction_id: 0 | 1
	route_id: string
	service_id: string
	shape_id: string
	trip_headsign: string
	trip_id: string
	trip_short_name?: string
	wheelchair_accessible: GTFSBool
}

/**
 * Represents a raw trip in the GTFS format.
 * This interface is used to parse raw data from GTFS files, where fields may be optional
 * or represented as strings. It is typically used for data ingestion before validation
 * and transformation into the `GTFS_Trip` format.
 */
export interface GTFS_Trip_Raw {
	bikes_allowed?: string
	block_id?: string
	direction_id?: string
	pattern_id?: string
	route_id?: string
	service_id?: string
	shape_id?: string
	trip_headsign?: string
	trip_id?: string
	trip_short_name?: string
	wheelchair_accessible?: string
}

/**
 * Extended version of the GTFS_Trip interface that includes a pattern_id.
 * This interface should be used for working with the GTFS-TML standard.
 */
export interface GTFS_Trip_Extended extends GTFS_Trip {
	pattern_id: string
}

/**
 * Represents a raw trip in the GTFS-TML format.
 * This interface is used to parse raw data from GTFS-TML files, where fields may be optional
 * or represented as strings. It is typically used for data ingestion before validation
 * and transformation into the `GTFS_Trip_Extended` format.
 */
export interface GTFS_Trip_Extended_Raw extends GTFS_Trip_Raw {
	pattern_id?: string
}
