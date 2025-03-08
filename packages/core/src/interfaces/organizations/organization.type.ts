import { DocumentSchema } from '@/types/common';
import z from 'zod';

export const OrganizationSchema = DocumentSchema.extend({
	code: z.string(),
	name: z.string(),
}).strict();

export const CreateOrganizationSchema = OrganizationSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateOrganizationSchema = CreateOrganizationSchema.partial();

export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationDto = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationDto = Partial<CreateOrganizationDto>;
