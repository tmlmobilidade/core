/* * */

import { DocumentSchema, type UnixTimestamp } from '@/types/common';
import { validateUnixTimestamp } from '@/utils';
import { z } from 'zod';

/* * */

export const VehicleEventSchema = DocumentSchema.extend({
	agency_id: z.string(),
	driver_id: z.string(),
	event_id: z.string(),
	extra_trip_id: z.string().nullish(),
	latitude: z.number(),
	longitude: z.number(),
	odometer: z.number(),
	pattern_id: z.string(),
	received_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	stop_id: z.string(),
	trigger_activity: z.string(),
	trigger_door: z.string(),
	trip_id: z.string(),
	vehicle_id: z.string(),
}).strict();

/**
 * Vehicle Events are produced by the vehicle's on-board computer on a regular schedule
 * or whenever a significant event occurs. These events are used to track the vehicle's
 * location, speed, and status, as well as the current service being provided by the vehicle.
 * These events are based on the GTFS-RT specification but extended with additional fields
 * specific to TML's needs.
 */
export interface VehicleEvent extends Omit<z.infer<typeof VehicleEventSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
