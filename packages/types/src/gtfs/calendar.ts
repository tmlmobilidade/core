/* * */

import { type OperationalDate } from '@/_common/operational-date.js';

/**
 *  Represents a calendar in the GTFS (General Transit Feed Specification) format.
 *  A calendar defines the days of the week on which a particular service is available,
 *  along with the start and end dates of the service period.
 */
export interface GTFS_Calendar {
	end_date: OperationalDate
	friday: 0 | 1
	monday: 0 | 1
	saturday: 0 | 1
	service_id: string
	start_date: OperationalDate
	sunday: 0 | 1
	thursday: 0 | 1
	tuesday: 0 | 1
	wednesday: 0 | 1
}

/**
 * Represents a raw calendar in the GTFS format.
 * This interface is used to parse raw data from GTFS files, where fields may be optional
 * or represented as strings. It is typically used for data ingestion before validation
 * and transformation into the `GTFS_Calendar` format.
 */
export interface GTFS_Calendar_Raw {
	end_date?: string
	friday?: string
	monday?: string
	saturday?: string
	service_id?: string
	start_date?: string
	sunday?: string
	thursday?: string
	tuesday?: string
	wednesday?: string
}
