import { z } from 'zod';

/* * */

import { MetricBasePropertiesSchema, MetricBaseSchema } from '@/metrics/common.js';

export const DemandByLineSchema = MetricBaseSchema.extend({
	data: z.record(
		z.string(),
		z.object({
			qty: z.number(),
		}),
	),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

export const DemandByPatternSchema = MetricBaseSchema.extend({
	data: z.record(
		z.string(),
		z.object({
			qty: z.number(),
		}),
	),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		pattern_id: z.string(),
	}),
});

export const DemandRecordSchema = MetricBaseSchema.extend({
	data: z.object({
		operators: z.record(
			z.string(),
			z.record(
				z.string(),
				z.object({
					qty: z.number(),
				}),
			),
		),
		total: z.record(
			z.string(),
			z.object({
				qty: z.number(),
			}),
		),
	}),
	metric: z.literal('top_day_by_operator_and_total'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
	}),
});

// /metrics/demand_by_line_by_year?line=4701
export const DemandByLineByYearSchema = DemandByLineSchema.extend({
	metric: z.literal('demand_by_line_by_year'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

export const DemandByLineByMonthSchema = DemandByLineSchema.extend({
	metric: z.literal('demand_by_line_by_month'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

export const DemandByLineByDaySchema = DemandByLineSchema.extend({
	metric: z.literal('demand_by_line_by_day'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		line_id: z.string(),
	}),
});

export const DemandByPatternByYearSchema = DemandByPatternSchema.extend({
	metric: z.literal('demand_by_pattern_by_year'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		pattern_id: z.string(),
	}),
});

export const DemandByPatternByMonthSchema = DemandByPatternSchema.extend({
	metric: z.literal('demand_by_pattern_by_month'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		pattern_id: z.string(),
	}),
});

export const DemandByPatternByDaySchema = DemandByPatternSchema.extend({
	metric: z.literal('demand_by_pattern_by_day'),
	properties: MetricBasePropertiesSchema.extend({
		interval: z.literal(300000),
		pattern_id: z.string(),
	}),
});

export const DemandByPatternHourByYearSchema = DemandByPatternSchema.extend({
	metric: z.literal('demand_by_pattern_hour_by_year'),
	properties: MetricBasePropertiesSchema.extend({
		hour: z.number().min(0).max(23),
		interval: z.literal(300000),
		minute: z.number().min(0).max(59),
		pattern_id: z.string(),
	}),
});

export const DemandByPatternHourByMonthSchema = DemandByPatternSchema.extend({
	metric: z.literal('demand_by_pattern_hour_by_month'),
	properties: MetricBasePropertiesSchema.extend({
		hour: z.number().min(0).max(23),
		interval: z.literal(300000),
		minute: z.number().min(0).max(59),
		pattern_id: z.string(),
	}),
});

/* * */
