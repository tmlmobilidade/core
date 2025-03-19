/* * */

import { DocumentSchema, type UnixTimestamp } from '@/types/index.js';
import { validateUnixTimestamp } from '@/utils/index.js';
import { z } from 'zod';

export const PermissionSchema = z.object({
	action: z.string(),
	resource: z.record(z.any()).nullish(),
	scope: z.string(),
});

export interface Permission<T> {
	action: string
	resource?: Partial<Record<keyof T, T[keyof T][]>>
	scope: string
}

/* * */

export const UserSchema = DocumentSchema.extend({
	avatar: z.string().nullish(),
	bio: z.string().nullish(),
	email: z.string().email(),
	email_verified: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	first_name: z.string(),
	last_name: z.string(),
	organization_ids: z.array(z.string()).default([]),
	password_hash: z.string(),
	permissions: z.array(PermissionSchema),
	phone: z.string(),
	role_ids: z.array(z.string()).default([]),
	session_ids: z.array(z.string()).default([]),
	verification_token_ids: z.array(z.string()).default([]),
}).strict();

export const CreateUserSchema = UserSchema.omit({ _id: true, created_at: true, password_hash: true, updated_at: true });
export const UpdateUserSchema = CreateUserSchema.partial().extend({
	password_hash: z.string().optional(),
});

export interface User extends Omit<z.infer<typeof UserSchema>, 'created_at' | 'email_verified' | 'updated_at'> {
	created_at: UnixTimestamp
	email_verified?: UnixTimestamp
	updated_at: UnixTimestamp
}
export interface CreateUserDto extends Omit<z.infer<typeof CreateUserSchema>, 'email_verified' | 'password_hash'> {
	email_verified?: UnixTimestamp
}
export type UpdateUserDto = Partial<CreateUserDto> & { password_hash?: string };

/* * */

export const LoginDtoSchema = z.object({
	email: z.string({
		required_error: 'Email is required',
	}).email({
		message: 'Email must be a valid email address',
	}),
	password: z.string({
		required_error: 'Password is required',
	}),
}).strict();

export type LoginDto = z.infer<typeof LoginDtoSchema>;

/* * */

export const RoleSchema = DocumentSchema.extend({
	name: z.string(),
	permissions: z.array(PermissionSchema),
}).strict();

export const CreateRoleSchema = RoleSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateRoleSchema = CreateRoleSchema.partial();

export interface Role extends Omit<z.infer<typeof RoleSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}
export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
export type UpdateRoleDto = Partial<CreateRoleDto>;

/* * */

export const VerificationTokenSchema = DocumentSchema.extend({
	expires: z.coerce.date(),
	token: z.string(),
	user_id: z.string(),
}).strict();

export const CreateVerificationTokenSchema = VerificationTokenSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateVerificationTokenSchema = CreateVerificationTokenSchema.partial();

export interface VerificationToken extends Omit<z.infer<typeof VerificationTokenSchema>, 'created_at' | 'updated_at'> {
	created_at: UnixTimestamp
	updated_at: UnixTimestamp
}
export type CreateVerificationTokenDto = z.infer<typeof CreateVerificationTokenSchema>;
export type UpdateVerificationTokenDto = Partial<CreateVerificationTokenDto>;

/* * */

export const SessionSchema = DocumentSchema.extend({
	expires_at: z.coerce.date().nullish(),
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
