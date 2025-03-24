/* * */

import { DocumentSchema, type UnixTimestamp, validateUnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexT19Schema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_version: z.string(),
	device_id: z.string(),
	line_id: z.string(),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
	pattern_id: z.string(),
	received_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	stop_id: z.string(),
	trip_id: z.string(),
	vehicle_id: z.string(),
}).strict();

/**
 * APEX T19 are APEX transactions of type 19 that are generated every time the
 * setContext or setLocation functions are called. These functions are used to set
 * the service context of the vehicle, allowing for the correct validation of products.
 * In summary, these transactions are generated every time the vehicle has a change in
 * the current stop ID, trip ID, route ID, pattern ID, etc.
 */
export interface ApexT19 extends Omit<z.infer<typeof ApexT19Schema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
