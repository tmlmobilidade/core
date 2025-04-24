/* * */

import { DocumentSchema, type UnixTimestamp, validateUnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexT3Schema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_version: z.string(),
	card_serial_number: z.string(),
	device_id: z.string(),
	invoice_number: z.string(),
	line_id: z.string().optional(),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
	pattern_id: z.string().optional(),
	payment_method: z.number(),
	price: z.number(),
	product_id: z.string(),
	product_quantity: z.number(),
	received_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	stop_id: z.string().optional(),
	trip_id: z.string().optional(),
	units_quantity: z.number(),
	vehicle_id: z.string().optional(),
}).strict();

/**
 * APEX T3 are APEX transactions of type 3 that are generated whenever a sale of a product occurs.
 * Sales can be inside vehicles, at vending machines, or at ticket offices, and they can be
 * of travel products (like tickets) or non-travel products (like merch and other items).
 */
export interface ApexT3 extends Omit<z.infer<typeof ApexT3Schema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
