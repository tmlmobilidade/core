/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';
import { SimplifiedApexBaseSchema } from '@/simplified-apex/simplified-apex-base.js';
import { z } from 'zod';

/* * */

export const ApexInspectionDecisionSchema = SimplifiedApexBaseSchema.extend({
	final_decision: z.number(),
	inspection_transaction_id: z.string(),
}).strict();

/**
 * APEX Inspection Decisions are APEX transactions of type 16 that are generated when an inspector
 * makes a decision about a card holder's inspection. These decisions can be associated with an Inspection
 * transaction (T15) that contains the details of the inspection.
 * The final decision can be one of the following:
 */
export interface SimplifiedApexInspectionDecision extends Omit<z.infer<typeof ApexInspectionDecisionSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
