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
 * APEX OnBoard Sales are APEX transactions of type 3 that are generated whenever a sale
 * of an on-board ticket occurs. Even though sales can be of anything (tickets, cards, contracts, merchandising items)
 * and anywhere (inside vehicles, at vending machines, at ticket offices or online), here they are already filtered
 * for on-board ticket sales inside vehicles only. Sales of tickets when inside vehicles also generate a validation transaction.
 * Sales can be refunded, and refunds are also APEX transactions of type 3.
 */
export interface ApexOnBoardSale extends Omit<z.infer<typeof ApexOnBoardSaleSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
