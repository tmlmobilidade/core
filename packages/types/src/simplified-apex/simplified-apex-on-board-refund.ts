/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';

/**
 * APEX OnBoard Refunds are APEX transactions of type 6 that are generated whenever a refund
 * of an on-board ticket occurs. Even though refunds can be generated for any sale, here they are already filtered
 * for on-board ticket refunds inside vehicles only. Refunds are always associated with an on-board sale transaction.
 */
export interface SimplifiedApexOnBoardRefund {

	_go_correlation__on_board_sale_id: null | string
	_go_correlation__validation_id: null | string

	_go_default__created_at: UnixTimestamp
	_go_default__updated_at: UnixTimestamp

	_go_enriched__block_id: null | string
	_go_enriched__duty_id: null | string
	_go_enriched__is_valid: boolean
	_go_enriched__journey_id: null | string
	_go_enriched__line_long_id: null | string
	_go_enriched__pattern_long_id: null | string
	_go_enriched__stop_long_id: null | string
	_go_enriched__vehicle_id: null | string

	_id: string

	card_info__card_physical_type: number
	card_info__card_serial_number: string

	mac__ase_counter_value: number
	mac__sam_serial_number: number

	operator_info__operator_long_id: string

	payment_info__payment_method: number
	payment_info__price: number

	sale_load_info__product_long_id: string
	sale_load_info__product_quantity: number
	sale_load_info__units_quantity: null | number

	transaction_info__apex_transaction_type: 6
	transaction_info__transaction_date: string

	version_info__apex_version: string

}
