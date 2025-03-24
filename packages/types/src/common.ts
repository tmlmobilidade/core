/* * */

import { validateUnixTimestamp } from '@/utils/index.js';
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

/* * */

/**
 * UnixTimestamp, in this context, is a number that represents
 * the number of milliseconds since the Unix epoch (1970-01-01T00:00:00Z).
 */
export type UnixTimestamp = number & {
	__brand: 'UnixTimestamp'
};

/* * */

export const DocumentSchema = z.object({
	_id: z.string(),
	created_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
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
