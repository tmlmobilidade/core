/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';
import { SimplifiedApexBaseSchema } from '@/simplified-apex/simplified-apex-base.js';
import { z } from 'zod';

/* * */

export const ApexInspectionSchema = SimplifiedApexBaseSchema.extend({
	card_serial_number: z.string(),
	contract_status: z.array(
		z.object({
			number: z.number(),
			status: z.number(),
		}),
	),
	product_id: z.string(),
}).strict();

/**
 * APEX Inspections are APEX transactions of type 15 that are generated when an inspector reads a card holder's card.
 * These inspection transactions can be associated with an Inspection Decision transaction (T16) that contains
 * the final decision of the inspector to generate a fine.
 */
export interface SimplifiedApexInspection extends Omit<z.infer<typeof ApexInspectionSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
