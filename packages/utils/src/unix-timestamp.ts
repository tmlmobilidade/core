/* * */

import { OPERATIONAL_DATE_FORMAT, type OperationalDate, type UnixTimestamp } from '@tmlmobilidade/types';
import { DateTime } from 'luxon';

/**
 * Returns the current Unix Timestamp, in milliseconds.
 * @returns The current Unix Timestamp.
 */
export function getUnixTimestamp(): UnixTimestamp {
	return DateTime.now().toMillis() as UnixTimestamp;
}

export function getUnixTimestampFromOperationalDate(date: OperationalDate): UnixTimestamp {
	const parsedDate = DateTime.fromFormat(date, OPERATIONAL_DATE_FORMAT);
	if (!parsedDate.isValid) throw new Error(`Invalid date format '${date}', expected format: ${OPERATIONAL_DATE_FORMAT}, explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.set({ hour: 4 }).toMillis() as UnixTimestamp;
}

export function getUnixTimestampFromFormat(date: string, format: string): UnixTimestamp {
	const parsedDate = DateTime.fromFormat(date, format);
	if (!parsedDate.isValid) throw new Error(`Invalid date format '${date}', expected format: ${format}, explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.toMillis() as UnixTimestamp;
}

export function getUnixTimestampFromJSDate(date: Date): UnixTimestamp {
	const parsedDate = DateTime.fromJSDate(date);
	if (!parsedDate.isValid) throw new Error(`Invalid date '${date}', explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.toMillis() as UnixTimestamp;
}

export function getUnixTimestampFromSeconds(seconds: number): UnixTimestamp {
	const parsedDate = DateTime.fromSeconds(seconds);
	if (!parsedDate.isValid) throw new Error(`Invalid date '${seconds}, explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.toMillis() as UnixTimestamp;
}
