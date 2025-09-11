/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const SessionSchema = DocumentSchema.extend({
	expires_at: unixTimeStampSchema.nullish(),
	token: z.string(),
	user_id: z.string(),
}).strict();

export const CreateSessionSchema = SessionSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateSessionSchema = CreateSessionSchema.partial();

export interface Session extends Omit<z.infer<typeof SessionSchema>, 'created_at' | 'expires_at' | 'updated_at'> {
	created_at: UnixTimestamp
	expires_at?: UnixTimestamp
	updated_at: UnixTimestamp
}
export interface CreateSessionDto extends Omit<z.infer<typeof CreateSessionSchema>, 'expires_at'> {
	expires_at?: UnixTimestamp
}
export type UpdateSessionDto = Partial<CreateSessionDto>;
