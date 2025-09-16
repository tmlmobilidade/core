/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export const QuickLinkValueSchema = z.union([
	z.string(),
	z.string(),
	z.string(),
]);

export type QuickLinkValue = z.infer<typeof QuickLinkValueSchema>;

/* * */

export const QuickLinkSchema = DocumentSchema.extend({
	href: z.string(),
	icon: z.string(),
	title: z.string(),
}).strict();

export const CreateQuickLinkSchema = QuickLinkSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateQuickLinkSchema = CreateQuickLinkSchema.omit({ created_by: true }).partial();

export type QuickLink = z.infer<typeof QuickLinkSchema>;
export type CreateQuickLinkDto = z.infer<typeof CreateQuickLinkSchema>;
export type UpdateQuickLinkDto = z.infer<typeof UpdateQuickLinkSchema>;
