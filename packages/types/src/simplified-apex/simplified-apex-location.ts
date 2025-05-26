/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';
import { SimplifiedApexBaseSchema } from '@/simplified-apex/simplified-apex-base.js';
import { z } from 'zod';

/* * */

export const SimplifiedApexLocationSchema = SimplifiedApexBaseSchema;

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
