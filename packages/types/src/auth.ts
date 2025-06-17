/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp, validateUnixTimestamp } from '@/_common/unix-timestamp.js';
import { z } from 'zod';

export const PermissionSchema = z.object({
	action: z.string(),
	resource: z.record(z.any()).nullish(),
	scope: z.string(),
});

export interface Permission<T> {
	action: string
	resource?: Partial<Record<keyof T, T[keyof T]>>
	scope: string
}

/* * */

export const UserSchema = DocumentSchema.extend({
	avatar: z.string().nullish(),
	bio: z.string().nullish(),
	email: z.string().email(),
	email_verified: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
	first_name: z.string().nonempty(),
	last_name: z.string().nonempty(),
	organization_ids: z.array(z.string()).default([]),
	password_hash: z.string().nullish(),
	permissions: z.array(PermissionSchema),
	phone: z.string().nullish(),
	role_ids: z.array(z.string()).default([]),
	session_ids: z.array(z.string()).default([]),
	verification_token_ids: z.array(z.string()).default([]),
}).strict();

export const CreateUserSchema = UserSchema.omit({ _id: true, created_at: true, password_hash: true, updated_at: true });
export const UpdateUserSchema = CreateUserSchema.extend({ password_hash: z.string() }).partial();

export interface User extends Omit<z.infer<typeof UserSchema>, 'created_at' | 'email_verified' | 'updated_at'> {
	created_at: UnixTimestamp
	email_verified?: null | UnixTimestamp
	updated_at: UnixTimestamp
}
export interface CreateUserDto extends Omit<z.infer<typeof CreateUserSchema>, 'created_at' | 'email_verified' | 'updated_at'> {
	created_at?: UnixTimestamp
	email_verified?: null | UnixTimestamp
	updated_at?: UnixTimestamp
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

export const PasswordRequirementsSchema = z.object({
	password: z.string(),
})
	.superRefine(({ password }, checkPassComplexity) => {
		const CONDITIONS = {
			minLength: 8,
			minLowerCase: 1,
			minNumber: 1,
			minSpecialChar: 1,
			minUpperCase: 1,
		};

		const errObj = {
			minLength: CONDITIONS.minLength > 0 ? {
				message: `Password must be at least ${CONDITIONS.minLength} characters long`,
				valid: password.length >= CONDITIONS.minLength,
			} : undefined,
			minLowerCase: CONDITIONS.minLowerCase > 0 ? {
				message: 'Password must contain at least one lowercase character',
				valid: (password.match(/[a-z]/) || []).length >= CONDITIONS.minLowerCase,
			} : undefined,
			minNumber: CONDITIONS.minNumber > 0 ? {
				message: 'Password must contain at least one number',
				valid: (password.match(/\d/) || []).length >= CONDITIONS.minNumber,
			} : undefined,
			minSpecialChar: CONDITIONS.minSpecialChar > 0 ? {
				message: 'Password must contain at least one special character',
				valid: (password.match(/[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/) || []).length >= CONDITIONS.minSpecialChar,
			} : undefined,
			minUpperCase: CONDITIONS.minUpperCase > 0 ? {
				message: 'Password must contain at least one uppercase character',
				valid: (password.match(/[A-Z]/) || []).length >= CONDITIONS.minUpperCase,
			} : undefined,
		};

		checkPassComplexity.addIssue({ code: z.ZodIssueCode.custom, message: JSON.stringify(errObj), path: ['password'] });
	});

export type PasswordRequirements = z.infer<typeof PasswordRequirementsSchema>;

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

/* * */

export const SessionSchema = DocumentSchema.extend({
	expires_at: z.number().transform(validateUnixTimestamp).brand('UnixTimestamp').nullish(),
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

/* * */
