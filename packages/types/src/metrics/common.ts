import { z } from 'zod';

/* * */

const TIME_GRANULARITY_VALUES = ['daily', 'monthly', 'yearly', 'custom'] as const;

export const TimeGranularitySchema = z.enum(TIME_GRANULARITY_VALUES);
export type TimeGranularity = z.infer<typeof TimeGranularitySchema>;

/* * */

const METRIC_SCOPE_VALUES = ['service_compliance', 'resource_management', 'demand', 'contract_compliance', 'financial'] as const;

export const MetricScopeSchema = z.enum(METRIC_SCOPE_VALUES);
export type MetricScope = z.infer<typeof MetricScopeSchema>;

/* * */

const METRIC_VALUES = ['demand_by_line'] as const;

export const MetricsSchema = z.enum(METRIC_VALUES);
export type Metrics = z.infer<typeof MetricsSchema>;

/* * */

export const MetricBasePropertiesSchema = z.object({
	interval: z.number(),
	time_granularity: TimeGranularitySchema.optional(),
});

export const MetricBaseSchema = z.object({
	_id: z.string(),
	description: z.string().optional(),
	generated_at: z.date(),
	metric: MetricsSchema,
	properties: MetricBasePropertiesSchema,
	scope: MetricScopeSchema,
});
