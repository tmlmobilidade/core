/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export const HomeLinkSchema = z.object({
	href: z.string(),
	icon: z.string(),
	title: z.string(),
}).strict();

export type HomeLink = z.infer<typeof HomeLinkSchema>;

/* * */

export const OrganizationSchema = DocumentSchema.extend({
	home_links: z.array(HomeLinkSchema).default([]),
	home_wikis: z.array(z.string()).default([]),
	logo: z.string().nullish(),
	long_name: z.string().nonempty(),
	short_name: z.string().nonempty(),
	theme: z.string().nullish(),

}).strict();

export const CreateOrganizationSchema = OrganizationSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateOrganizationSchema = CreateOrganizationSchema.omit({ created_by: true }).partial();

export type Organization = z.infer<typeof OrganizationSchema>;
export type CreateOrganizationDto = z.infer<typeof CreateOrganizationSchema>;
export type UpdateOrganizationDto = z.infer<typeof UpdateOrganizationSchema>;
