/* * */

import { DocumentSchema, type UnixTimestamp } from '@/common.js';
import { validateUnixTimestamp } from '@tmlmobilidade/utils';
import { z } from 'zod';

/* * */

export enum ValidationStatus {

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

export const ApexT11Schema = DocumentSchema.extend({
	agency_id: z.string(),
	apex_version: z.string(),
	card_serial_number: z.string(),
	device_id: z.string(),
	line_id: z.string(),
	mac_ase_counter_value: z.number(),
	mac_sam_serial_number: z.number(),
	pattern_id: z.string(),
	product_id: z.string(),
	received_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	stop_id: z.string(),
	trip_id: z.string(),
	validation_status: z.nativeEnum(ValidationStatus),
	vehicle_id: z.string(),
}).strict();

/**
 * APEX T11 are APEX transactions of type 11 that are generated when a card holder touches a validator
 * reader (ex: bus validator, subway gate). These validation transactions represent the card holder's right to travel
 * on a given route, line, or vehicle. T11s have statuses that indicate if the card holder was allowed to travel
 * or not, and with which conditions. A validation also contains information about the card holder's card, the vehicle,
 * the validator machine, the route, and the time and location of the validation.
 */
export interface ApexT11 extends Omit<z.infer<typeof ApexT11Schema>, 'created_at' | 'received_at' | 'updated_at'> {
	created_at: UnixTimestamp
	received_at: UnixTimestamp
	updated_at: UnixTimestamp
}

/**
 * Validation statuses that are considered valid for the card holder to travel.
 */
export const ALLOWED_VALIDATION_STATUSES = [ValidationStatus._0_ContractValid, ValidationStatus._4_CardInWhiteList, ValidationStatus._5_ProfileInWhiteList, ValidationStatus._6_Interchange];
