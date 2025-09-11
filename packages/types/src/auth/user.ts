/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { type Permission, PermissionSchema } from '@/auth/permission.js';
import { z } from 'zod';

/* * */

export const UserPreferenceValueSchema = z.union([
	z.string(),
	z.number(),
	z.boolean(),
	z.array(z.string()),
	z.array(z.number()),
]);

export type UserPreferenceValue = z.infer<typeof UserPreferenceValueSchema>;

/* * */

export const UserSchema = DocumentSchema.extend({
	avatar: z.string().nullish(),
	bio: z.string().nullish(),
	email: z.string().email(),
	email_verified: unixTimeStampSchema.nullish(),
	first_name: z.string().nonempty(),
	last_name: z.string().nonempty(),
	organization_ids: z.array(z.string()).default([]),
	password_hash: z.string().nullish(),
	permissions: z.array(PermissionSchema),
	phone: z.string().nullish(),
	preferences: z.record(z.record(UserPreferenceValueSchema)).nullish(),
	role_ids: z.array(z.string()).default([]),
	session_ids: z.array(z.string()).default([]),
	theme_id: z.string().nullish(),
	verification_token_ids: z.array(z.string()).default([]),
}).strict();

export const CreateUserSchema = UserSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateUserSchema = CreateUserSchema.partial();

export interface User extends Omit<z.infer<typeof UserSchema>, 'created_at' | 'email_verified' | 'permissions' | 'updated_at'> {
	created_at: UnixTimestamp
	email_verified?: null | UnixTimestamp
	permissions: Permission<unknown>[]
	updated_at: UnixTimestamp
}
export interface CreateUserDto extends Omit<z.infer<typeof CreateUserSchema>, 'created_at' | 'email_verified' | 'updated_at'> {
	created_at?: UnixTimestamp
	email_verified?: null | UnixTimestamp
	updated_at?: UnixTimestamp
}
export type UpdateUserDto = Partial<CreateUserDto> & { password_hash?: string };
