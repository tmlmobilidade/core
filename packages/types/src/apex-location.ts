/* * */

import { ApexTransactionSchema } from '@/apex-common.js';
import { type UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexLocationSchema = ApexTransactionSchema;

/**
 * APEX T19 are APEX transactions of type 19 that are generated every time the
 * setContext or setLocation functions are called. These functions are used to set
 * the service context of the vehicle, allowing for the correct validation of products.
 * In summary, these transactions are generated every time the vehicle has a change in
 * the current stop ID, trip ID, route ID, pattern ID, etc.
 */
export interface ApexLocation extends Omit<z.infer<typeof ApexLocationSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
