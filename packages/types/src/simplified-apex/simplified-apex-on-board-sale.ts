/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';

/**
 * APEX OnBoard Sales are APEX transactions of type 3 that are generated whenever a sale
 * of an on-board ticket occurs. Even though sales can be of anything (tickets, cards, contracts, merchandising items)
 * and anywhere (inside vehicles, at vending machines, at ticket offices or online), here they are already filtered
 * for on-board ticket sales inside vehicles only. Sales of tickets when inside vehicles also generate a validation transaction.
 * Sales can be refunded, and refunds are also APEX transactions of type 3.
 */
export interface SimplifiedApexOnBoardSale {

	_go_correlation__on_board_refund_id: string
	_go_correlation__validation_id: string

	_go_default__created_at: UnixTimestamp
	_go_default__updated_at: UnixTimestamp

	_go_enriched__block_id: string
	_go_enriched__duty_id: string
	_go_enriched__is_valid: boolean
	_go_enriched__journey_id: string
	_go_enriched__line_long_id: string
	_go_enriched__pattern_long_id: string
	_go_enriched__stop_long_id: string
	_go_enriched__vehicle_id: string

	_id: string

	card_info__card_number: string
	card_info__card_physical_type: number
	card_info__card_serial_number: string
	card_info__card_type_id: string

	mac__ase_counter_value: number
	mac__sam_serial_number: number

	operator_info__operator_long_id: string

	payment_info__currency: number
	payment_info__invoice_number: string
	payment_info__payment_method: number
	payment_info__price: number
	payment_info__vat_number: number

	sale_load_info__product_long_id: string
	sale_load_info__product_quantity: number
	sale_load_info__units_quantity: number

	transaction_info__apex_transaction_type: 3
	transaction_info__transaction_date: string

	version_info__apex_version: string

}
