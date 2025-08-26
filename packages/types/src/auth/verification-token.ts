/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

/* * */

export const VerificationTokenSchema = DocumentSchema.extend({
	expires_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp'),
	token: z.string(),
	user_id: z.string(),
}).strict();

export const CreateVerificationTokenSchema = VerificationTokenSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateVerificationTokenSchema = CreateVerificationTokenSchema.partial();

export interface VerificationToken extends Omit<z.infer<typeof VerificationTokenSchema>, 'created_at' | 'expires_at' | 'updated_at'> {
	created_at: UnixTimestamp
	expires_at: UnixTimestamp
	updated_at: UnixTimestamp
}
export type CreateVerificationTokenDto = Omit<z.infer<typeof CreateVerificationTokenSchema>, 'expires_at'> & { expires_at: UnixTimestamp };
export type UpdateVerificationTokenDto = Partial<CreateVerificationTokenDto>;
