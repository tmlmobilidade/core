/* * */

import { ApexTransactionSchema } from '@/apex-common.js';
import { type UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexOnBoardSaleSchema = ApexTransactionSchema.extend({
	card_physical_type: z.string(),
	card_serial_number: z.string(),
	card_type_id: z.string(),
	invoice_number: z.string(),
	payment_method: z.number(),
	price: z.number(),
	product_id: z.string(),
	product_qty: z.number(),
	refund_transaction_id: z.string(),
	validation_transaction_id: z.string(),
}).strict();

/**
 * APEX T3 are APEX transactions of type 3 that are generated whenever a sale of a product occurs.
 * Sales can be inside vehicles, at vending machines, or at ticket offices, and they can be
 * of travel products (like tickets) or non-travel products (like merch and other items).
 */
export interface ApexOnBoardSale extends Omit<z.infer<typeof ApexOnBoardSaleSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
