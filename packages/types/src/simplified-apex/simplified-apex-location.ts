/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';

/**
 * APEX Locations are APEX transactions of type 19 that are generated every time the
 * setContext or setLocation functions are called. These functions are used to set
 * the service context of the validator machine, allowing for the correct sale and validation
 * of products. In summary, these transactions are generated every time the vehicle has a change
 * in the current stop ID, trip ID, route ID, pattern ID, etc.
 */
export interface SimplifiedApexLocation {

	_go_default__created_at: UnixTimestamp
	_go_default__updated_at: UnixTimestamp

	_id: string

	mac__ase_counter_value: number
	mac__sam_serial_number: number

	operator_info__operator_long_id: string

	transaction_info__apex_transaction_type: 19
	transaction_info__transaction_date: string

	validation_service_info__block_id: string
	validation_service_info__duty_id: string
	validation_service_info__journey_id: string
	validation_service_info__line_long_id: string
	validation_service_info__on_behalf_of_operator_long_id: string
	validation_service_info__operation_plan_id: string
	validation_service_info__out_of_bounds_type: number
	validation_service_info__pattern_long_id: string
	validation_service_info__stop_long_id: string
	validation_service_info__validator_id: number
	validation_service_info__vehicle_id: number

	version_info__apex_version: string

}
