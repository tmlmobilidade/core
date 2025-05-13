/* * */

import { DocumentSchema, validateUnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexTransactionSchema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_transaction_type: z.number(),
	apex_version: z.string(),
	device_id: z.string(),
	is_valid: z.boolean(),
	line_id: z.string(),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
	pattern_id: z.string(),
	received_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	stop_id: z.string(),
	trip_id: z.string(),
	vehicle_id: z.string(),
}).strict();
