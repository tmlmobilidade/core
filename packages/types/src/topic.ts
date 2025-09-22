/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

export type Topic = z.infer<typeof TopicSchema>;

export const TopicSchema = DocumentSchema.extend({
	priority: z.string().nullish(),
	subscribed_by: z.array(z.string()).default([]),
	title: z.string().nullish(),

}).strict();

/* * */

export const CreateTopicSchema = TopicSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateTopicSchema = CreateTopicSchema.omit({ created_by: true }).partial();

export type CreateTopicDto = z.infer<typeof CreateTopicSchema>;
export type UpdateTopicDto = z.infer<typeof UpdateTopicSchema>;
