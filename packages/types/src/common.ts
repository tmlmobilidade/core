/* * */

import { DateTime } from 'luxon';
import { type DeleteResult as MongoDeleteResult, type InsertOneResult as MongoInsertOneResult, type UpdateResult as MongoUpdateResult } from 'mongodb';
import { z } from 'zod';

/* * */

export type Email = string & {
	__brand: 'Email'
};

export function createEmail(email: string): Email {
	const parsedEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	if (!parsedEmail) throw new Error(`Invalid email format '${email}'`);
	return email as Email;
}

/* * */

export const OPERATIONAL_DATE_FORMAT = 'yyyyMMdd';

export type OperationalDate = string & {
	__brand: 'OperationalDate'
};

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

/* * */

/**
 * UnixTimestamp, in this context, is a number that represents
 * the number of milliseconds since the Unix epoch (1970-01-01T00:00:00Z).
 */
export type UnixTimestamp = number & {
	__brand: 'UnixTimestamp'
};

/**
 * This function validates if a number is a valid Unix Timestamp, in milliseconds.
 * It is assumed the number will always be greater than 10^10 (1e10) to ensure it is in milliseconds.
 * Throws an error if the date is invalid.
 * @param milliseconds - The number to be validated.
 * @returns The given number as a UnixTimestamp.
 */
export function validateUnixTimestamp(milliseconds: number): UnixTimestamp {
	if (milliseconds < 1e10) throw new Error(`Invalid value '${milliseconds}', expected a number in milliseconds but received a number smaller than 1e10`);
	const parsedDate = DateTime.fromMillis(milliseconds);
	if (!parsedDate.isValid) throw new Error(`Invalid date '${milliseconds}, explanation: ${parsedDate.invalidExplanation}`);
	return parsedDate.toMillis() as UnixTimestamp;
}

/* * */

export const DocumentSchema = z.object({
	_id: z.string(),
	created_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	is_locked: z.boolean().default(false),
	updated_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
});

/* * */

export const CommentSchema = DocumentSchema.extend({
	_id: z.string(),
	text: z.string(),
	user_id: z.string(),
}).strict();

/* * */

export type DeleteResult = MongoDeleteResult;
export type InsertOneResult<T> = MongoInsertOneResult<T>;
export type UpdateResult = MongoUpdateResult;
