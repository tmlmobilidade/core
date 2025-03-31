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

/**
 * Returns a JS Date object from a Unix Timestamp.
 * @param unixTimestamp - The Unix Timestamp to convert. in UTC.
 * @returns The JS Date object in local timezone.
 * @deprecated Use `getDateStringFromUnixTimestamp` instead.
 */
export function getJSDateFromUnixTimestamp(unixTimestamp: UnixTimestamp): Date {
	return DateTime.fromMillis(unixTimestamp, { zone: 'utc' }).toLocal().toJSDate();
}

/**
 * Returns a formatted date string from a UnixTimestamp.
 * @param timestamp - The Unix Timestamp to convert. UnixTimestamps are always in UTC.
 * @param options - Optional formatting options.
 * @param options.format - The format to use. Defaults to 'yyyy-MM-dd'.
 * @param options.timezone - The timezone to use. Defaults to 'local'.
 * @returns The formatted date string.
 */
export function getDateStringFromUnixTimestamp(timestamp: UnixTimestamp, options?: { format?: string, timezone?: string }): string {
	const date = DateTime.fromMillis(timestamp, { zone: 'utc' }).setZone(options?.timezone || 'local');
	return date.toFormat(options?.format || 'yyyy-MM-dd');
}

/**
 * Returns a formatted date string from Unix seconds.
 * @param timestamp - The Unix seconds to convert in UTC.
 * @param options - Optional formatting options.
 * @param options.format - The format to use. Defaults to 'yyyy-MM-dd'.
 * @param options.timezone - The timezone to use. Defaults to 'local'.
 * @returns The formatted date string.
 */
export function getDateStringFromUnixSeconds(timestamp: number, options?: { format?: string, timezone?: string }): string {
	const convertedUnixTimestamp = getUnixTimestampFromSeconds(timestamp);
	return getDateStringFromUnixTimestamp(convertedUnixTimestamp, options);
}
