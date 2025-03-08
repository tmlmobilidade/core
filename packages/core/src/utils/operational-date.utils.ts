/* * */

import { OPERATIONAL_DATE_FORMAT, type OperationalDate } from '@/types';
import { DateTime } from 'luxon';

/**
 * This function validates if a string is a valid operational date.
 * Throws an error if the date is invalid.
 * @param date - The date to be validated.
 * @returns The given string as an OperationalDate.
 */
export function validateOperationalDate(date: string): OperationalDate {
	const parsedDate = DateTime.fromFormat(date, OPERATIONAL_DATE_FORMAT);
	if (!parsedDate.isValid) throw new Error(`Invalid date format '${date}', expected format: ${OPERATIONAL_DATE_FORMAT}, explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.toFormat(OPERATIONAL_DATE_FORMAT) as OperationalDate;
}

/**
 * Returns the operational date based on the provided timestamp and format.
 *
 * @param timestamp - The timestamp to be parsed.
 * @param format - The format of the timestamp.
 * @returns The operational date in the yyyyLLdd format.
 */
export function getOperationalDate(timestamp?: DateTime | string, format?: string): OperationalDate {
	//

	//
	// Detect the type of the timestamp and parse it

	let dateObject: DateTime;

	if (typeof timestamp === 'string' && format) {
		dateObject = DateTime.fromFormat(timestamp, format);
		if (!dateObject.isValid) throw new Error(`Invalid date format '${timestamp}', expected format: ${format}, explanation: ${dateObject.invalidExplanation}`);
	}
	else if (timestamp && (timestamp as DateTime).isValid) {
		dateObject = timestamp as DateTime;
	}
	else {
		dateObject = DateTime.now();
	}

	//
	// Check if the time is between 00:00 and 03:59.
	// The operational date is between 04:00 and 03:59 of the following day.

	let operationalDate: string;

	if (dateObject.hour < 4) {
		// If true, return the previous day in the yyyyLLdd format
		const previousDay = dateObject.minus({ days: 1 });
		operationalDate = previousDay.toFormat('yyyyLLdd');
	}
	else {
		// Else, return the current day in the yyyyLLdd format
		operationalDate = dateObject.toFormat('yyyyLLdd');
	}

	//
	// Validate the operational date and return it

	return operationalDate as OperationalDate;

	//
}
