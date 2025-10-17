import { z } from 'zod';

/* * */

export const MetricBasePropertiesSchema = z.object({
	interval: z.number().default(3_600_000), // Run every hour
});

export const MetricBaseSchema = z.object({
	description: z.string().optional(),
	generated_at: z.date(),
	metric: z.string(),
	properties: MetricBasePropertiesSchema.default({}).optional(),
});
