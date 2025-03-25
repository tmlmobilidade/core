/* * */

import { type OperationalDate } from '@tmlmobilidade/types';
import { DateTime } from 'luxon';

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
