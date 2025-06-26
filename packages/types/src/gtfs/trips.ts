/* * */

import { type Trip } from 'gtfs-types';

/* * */

export interface TripExtended extends Trip {
	pattern_id: string
}

/* * */

export interface TripTxtRow {
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
