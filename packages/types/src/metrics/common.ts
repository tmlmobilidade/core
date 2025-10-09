import { z } from 'zod';

/* * */

export const MetricBasePropertiesSchema = z.object({
	interval: z.number(),
});

export const MetricBaseSchema = z.object({
	_id: z.string(),
	description: z.string().optional(),
	generated_at: z.date(),
	metric: z.string(),
	properties: MetricBasePropertiesSchema,
});
