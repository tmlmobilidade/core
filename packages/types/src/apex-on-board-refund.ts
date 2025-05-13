/* * */

import { ApexTransactionSchema } from '@/apex-common.js';
import { type UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

export const ApexOnBoardRefundSchema = ApexTransactionSchema.extend({
	card_physical_type: z.number(),
	card_serial_number: z.string(),
	invoice_number: z.string().optional(),
	on_board_sale_transaction_id: z.string().optional(),
	payment_method: z.number(),
	price: z.number(),
	product_id: z.string(),
	product_qty: z.number(),
	validation_transaction_id: z.string().optional(),
	// Overrides
	line_id: z.string().optional(),
	pattern_id: z.string().optional(),
	stop_id: z.string().optional(),
	trip_id: z.string().optional(),
	vehicle_id: z.string().optional(),
}).strict();

/**
 * APEX OnBoard Refunds are APEX transactions of type 3 that are generated whenever a refund
 * of an on-board ticket occurs. Even though refunds can be generated for any sale, here they are already filtered
 * for on-board ticket refunds inside vehicles only. Refunds are always associated with an on-board sale transaction.
 */
export interface ApexOnBoardRefund extends Omit<z.infer<typeof ApexOnBoardRefundSchema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}
