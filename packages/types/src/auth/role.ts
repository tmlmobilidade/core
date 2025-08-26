/* * */

import { DocumentSchema } from '@/_common/document.js';
import { type UnixTimestamp } from '@/_common/unix-timestamp.js';
import { PermissionSchema } from '@/auth/permission.js';
import { z } from 'zod';

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
