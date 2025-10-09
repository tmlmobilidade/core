import { DemandByLineByMonthSchema, DemandByLineByYearSchema } from '@/metrics/demand.js';
import { z } from 'zod';

/* * */

export const MetricSchema = z.discriminatedUnion('metric', [
	DemandByLineByYearSchema,
	DemandByLineByMonthSchema,
]);

/* * */

export type Metric = z.infer<typeof MetricSchema>;
