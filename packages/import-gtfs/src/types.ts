/* * */

import { SQLiteWriter } from '@tmlmobilidade/connectors';
import { type GTFS_Route_Extended, type GTFS_Shape, type GTFS_Stop_Extended, type GTFS_StopTime, type GTFS_Trip_Extended, type Plan } from '@tmlmobilidade/types';
import { type OperationalDate } from '@tmlmobilidade/types';

/**
 * Holds references to all GTFS-related SQL tables and writers.
 * Each property corresponds to a specific GTFS entity and is associated
 * with a SQLiteWriter instance for that entity.
 */
export interface GtfsSQLTables {
	calendar_dates: Map<string, OperationalDate[]>
	routes: SQLiteWriter<GTFS_Route_Extended>
	shapes: SQLiteWriter<GTFS_Shape>
	stop_times: SQLiteWriter<GTFS_StopTime>
	stops: SQLiteWriter<GTFS_Stop_Extended>
	trips: SQLiteWriter<GTFS_Trip_Extended>
}

/**
 * Context object used throughout the GTFS import process.
 * It contains counters for various entities, references to GTFS SQL tables,
 * the original plan metadata, sets of referenced IDs, and paths for working directories.
 */
export interface ImportGtfsContext {
	counters: {
		calendar_dates: number
		hashed_shapes: number
		hashed_trips: number
		shapes: number
		stop_times: number
		trips: number
	}
	gtfs: GtfsSQLTables
	plan: Plan
	referenced_route_ids: Set<string>
	referenced_shape_ids: Set<string>
	workdir: {
		download_file_path: string
		extract_dir_path: string
		path: string
	}
}
