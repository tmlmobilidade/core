/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const SimplifiedApexLocationSchema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_version: z.string(),
	device_id: z.string(),
	line_id: z.string(),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
	pattern_id: z.string(),
	received_at: unixTimeStampSchema,
	stop_id: z.string(),
	trip_id: z.string(),
	vehicle_id: z.number(),
}).strict();

export const UpdateSimplifiedApexLocationSchema = SimplifiedApexLocationSchema.partial();

/**
 * APEX Locations are APEX transactions of type 19 that are generated every time the
 * setContext or setLocation functions are called. These functions are used to set
 * the service context of the validator machine, allowing for the correct sale and validation
 * of products. In summary, these transactions are generated every time the vehicle has a change
 * in the current stop ID, trip ID, route ID, pattern ID, etc.
 */
export interface SimplifiedApexLocation extends Omit<z.infer<typeof SimplifiedApexLocationSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}

export type UpdateSimplifiedApexLocationDto = Partial<SimplifiedApexLocation>;
