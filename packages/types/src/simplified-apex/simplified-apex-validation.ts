/* * */

import { type UnixTimestamp } from '@/common/unix-timestamp.js';

/* * */

export enum ApexValidationStatus {

	/**
	 * VALID:
	 * The card holder had a valid contract for the given context.
	 */
	_0_ContractValid = 0,

	/**
	 * INVALID:
	 * The card holder already has a valid validation for the given context.
	 */
	_1_Antipassback = 1,

	/**
	 * INVALID:
	 * The card holder's card is in the black list.
	 */
	_2_CardInBlackList = 2,

	/**
	 * INVALID:
	 * The validator SAM is in the black list.
	 */
	_3_SamInBlackList = 3,

	/**
	 * VALID:
	 * The card holder's card is in the white list.
	 */
	_4_CardInWhiteList = 4,

	/**
	 * VALID:
	 * The card holder's profile is in the white list.
	 */
	_5_ProfileInWhiteList = 5,

	/**
	 * VALID:
	 * The context allows for validation re-use.
	 */
	_6_Interchange = 6,

	/**
	 * INVALID:
	 * The validation could not be written to the card.
	 */
	_7_Interrupted = 7,

	/**
	 * INVALID:
	 * The card holder does not have a valid contract for the given context.
	 */
	_8_NoValidContract = 8,

	/**
	 * INVALID:
	 * The card holder's card is invalidated.
	 */
	_9_CardInvalidated = 9,

	/**
	 * INVALID:
	 * The card holder's card or the validator's SAM has no more space for events.
	 */
	_10_EventsFull = 10,

	/**
	 * INVALID:
	 * The card holder's card does not have enough units for the given context.
	 */
	_11_NotEnoughUnits = 11,

	/**
	 * INVALID:
	 * The card holder's contract has expired.
	 */
	_12_ContractExpired = 12,

	/**
	 * INVALID:
	 * The maximum value for the validation status. This is used to validate the status.
	 */
	_13_MaxValue = 13,
}

/* * */

/**
 * APEX Validations are APEX transactions of type 11 that are generated when a card holder touches a validator
 * reader (ex: bus validator, subway gate). These validation transactions represent the card holder's right to travel
 * on a given route, line, or vehicle. T11s have statuses that indicate if the card holder was allowed to travel
 * or not, and with which conditions. A validation also contains information about the card holder's card, the vehicle,
 * the validator machine, the route, and the time and location of the validation.
 */
export interface SimplifiedApexValidation {

	_go_correlation__on_board_refund_id: string
	_go_correlation__on_board_sale_id: string

	_go_default__created_at: UnixTimestamp
	_go_default__updated_at: UnixTimestamp

	_go_enriched__is_valid: boolean

	_id: string

	card_info__card_number: string
	card_info__card_physical_type: number
	card_info__card_serial_number: string
	card_info__card_type_id: string

	mac__ase_counter_value: number
	mac__sam_serial_number: number

	operator_info__operator_long_id: string

	service_info__block_id: string
	service_info__duty_id: string
	service_info__journey_id: string
	service_info__line_long_id: string
	service_info__on_behalf_of_operator_long_id: string
	service_info__out_of_bounds_type: number
	service_info__pattern_long_id: string
	service_info__stop_long_id: string
	service_info__validator_id: number
	service_info__vehicle_id: number

	transaction_info__apex_transaction_type: 11
	transaction_info__transaction_date: string

	validation_info__event_type: number
	validation_info__product_long_id: string
	validation_info__units_remaining: null | number
	validation_info__validation_status: ApexValidationStatus
	validation_info__validation_type: number

	version_info__apex_version: string

}

/**
 * Validation statuses that are considered valid for the card holder to travel.
 */
export const ALLOWED_VALIDATION_STATUSES = [
	ApexValidationStatus._0_ContractValid,
	ApexValidationStatus._4_CardInWhiteList,
	ApexValidationStatus._5_ProfileInWhiteList,
	ApexValidationStatus._6_Interchange,
];
