/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export const OrganizationPreferenceValueSchema = z.union([
	z.string(),
	z.string(),
	z.boolean(),
	z.array(z.string()),
	z.array(z.string()),
]);

export type OrganizationPreferenceValue = z.infer<typeof OrganizationPreferenceValueSchema>;

/* * */

export const OrganizationSchema = DocumentSchema.extend({
	home_links: z.array(z.string()).default([]),
	home_wikis: z.array(z.string()).default([]),
	logo: z.string().nullish(),
	theme: z.string().nullish(),

}).strict();

export const CreateOrganizationSchema = OrganizationSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateOrganizationSchema = CreateOrganizationSchema.omit({ created_by: true }).partial();

export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationDto = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationSchema>;
