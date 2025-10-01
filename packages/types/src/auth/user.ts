/* * */

import { DocumentSchema } from '@/_common/document.js';
import { unixTimeStampSchema } from '@/_common/unix-timestamp.js';
import { type Permission, PermissionSchema } from '@/auth/permission.js';
import { NotificationSchema } from '@/notification.js';
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
	active_notifications: z.array(z.string()).default([]),
	avatar: z.string().nullish(),
	bio: z.string().nullish(),
	email: z.string().email(),
	email_verified: unixTimeStampSchema.nullish(),
	first_name: z.string().nonempty(),
	last_name: z.string().nonempty(),
	organization_id: z.string().nullish(),
	password_hash: z.string().nullish(),
	permissions: z.array(PermissionSchema),
	phone: z.string().nullish(),
	preferences: z.record(z.record(UserPreferenceValueSchema)).nullish(),
	role_ids: z.array(z.string()).default([]),
	session_ids: z.array(z.string()).default([]),
	subscribed_topics: z.array(z.string()).default([]),
	theme_id: z.string().nullish(),
	verification_token_ids: z.array(z.string()).default([]),
}).strict();

export const CreateUserSchema = UserSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateUserSchema = CreateUserSchema.omit({ created_by: true }).partial();

export interface User extends Omit<z.infer<typeof UserSchema>, 'permissions'> {
	permissions: Permission<unknown>[]
}
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;

export type UserDisplay = Pick<User, 'avatar' | 'email' | 'first_name' | 'last_name' | 'phone'>;
export type WithUser<T> = T & {
	created_by: Partial<UserDisplay>
	updated_by: Partial<UserDisplay>
};
