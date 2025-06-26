/* * */

import { type OperationalDate } from '@/_common/operational-date.js';

/**
 * Represents the type of exception for a service
 * in the GTFS (General Transit Feed Specification) format.
 * The exception type indicates whether a service
 * has been added or removed for a specific date.
 */
export enum ExceptionType {
	_1_SERVICE_ADDED = 1,
	_2_SERVICE_REMOVED = 2,
}

/**
 * Represents a calendar date exception in the GTFS format.
 * A calendar date exception indicates a specific date
 * when a service is either added or removed from the schedule.
 */
export interface GTFS_CalendarDate {
	date: OperationalDate
	exception_type: ExceptionType
	service_id: string
}

/**
 * Represents a raw calendar date exception in the GTFS format.
 * This interface is used to parse raw data from GTFS files,
 * where fields may be optional or represented as strings.
 * It is typically used for data ingestion before validation
 * and transformation into the `GTFS_CalendarDate` format.
 */
export interface GTFS_CalendarDate_Raw {
	date?: string
	exception_type?: string
	service_id?: string
}
