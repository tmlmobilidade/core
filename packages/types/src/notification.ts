/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export type Notification = z.infer<typeof NotificationSchema>;

export const NotificationSchema = DocumentSchema.extend({
	archived_by: z.array(z.string()).default([]),
	description: z.string().nullish(),
	link: z.string().url().nullish(),
	priority: z.string().nullish(),
	read_by: z.array(z.string()).default([]),
	related_topic: z.string().nullish(),
	title: z.string().nullish(),

}).strict();

/* * */

export const CreateNotificationSchema = NotificationSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateNotificationSchema = CreateNotificationSchema.omit({ created_by: true }).partial();

export type CreateNotificationDto = z.infer<typeof CreateNotificationSchema>;
export type UpdateNotificationDto = z.infer<typeof UpdateNotificationSchema>;
