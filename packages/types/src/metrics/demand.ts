import { z } from 'zod';

/* * */

import { MetricBasePropertiesSchema, MetricBaseSchema } from '@/metrics/common.js';

// /metrics/demand_by_line_by_year?line=4701
export const DemandByLineByYearSchema = MetricBaseSchema.extend({
	data: z.record(
		z.string(), // e.g. "2024", "2025"
		z.object({
			qty: z.number(),
		}),
	),
	metric: z.literal('demand_by_line_by_year'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

export const DemandByLineByMonthSchema = MetricBaseSchema.extend({
	data: z.record(
		z.string(), // e.g. "2024-01", "2024-02"
		z.object({
			qty: z.number(),
		}),
	),
	metric: z.literal('demand_by_line_by_month'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

/* * */
