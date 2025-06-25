/* * */

import { type Route, type Trip } from 'gtfs-types';

/* * */

export interface Trip_TMLExtended extends Trip {
	pattern_id: string
}

/* * */

export interface Route_TMLExtended extends Route {
	line_id: string
	line_long_name: string
	line_short_name: string
	path_type: string
}
