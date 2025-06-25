/* * */

import { type Route, type Stop, type Trip } from 'gtfs-types';

/* * */

export interface Trip_TMLExtended extends Trip {
	pattern_id: string
}

/* * */

export interface Route_TMLExtended extends Route {
	line_id: number
	line_long_name: string
	line_short_name: string
	path_type: number
}

/* * */

export interface Stop_TMLExtended extends Stop {
	municipality_id: string
	parish_id: string
	region_id: string
}
