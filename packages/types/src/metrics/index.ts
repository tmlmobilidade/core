import { DemandByLineByDaySchema, DemandByLineByMonthSchema, DemandByLineByYearSchema, DemandByPatternByDaySchema, DemandByPatternByMonthSchema, DemandByPatternByYearSchema, DemandByPatternHourByMonthSchema, DemandByPatternHourByYearSchema, DemandRecordSchema } from '@/metrics/demand.js';
import { z } from 'zod';

/* * */

export const MetricSchema = z.discriminatedUnion('metric', [
	DemandByLineByYearSchema,
	DemandByLineByMonthSchema,
	DemandByLineByDaySchema,
	DemandByPatternByYearSchema,
	DemandByPatternByMonthSchema,
	DemandByPatternByDaySchema,
	DemandByPatternHourByYearSchema,
	DemandByPatternHourByMonthSchema,
	DemandRecordSchema,
]);

/* * */

export type Metric = z.infer<typeof MetricSchema>;
