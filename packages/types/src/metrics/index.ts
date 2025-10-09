import { DemandByLineByMonthSchema, DemandByLineByYearSchema } from '@/metrics/demand.js';
import { z } from 'zod';

/* * */

export const MetricSchema = z.discriminatedUnion('metric', [
	DemandByLineByYearSchema,
	DemandByLineByMonthSchema,
]);

export const CreateMetricSchema = z.discriminatedUnion('metric', [
	DemandByLineByYearSchema.omit({ _id: true }),
	DemandByLineByMonthSchema.omit({ _id: true }),
]);

export const UpdateMetricSchema = z.discriminatedUnion('metric', [
	DemandByLineByYearSchema.omit({ _id: true }).partial(),
	DemandByLineByMonthSchema.omit({ _id: true }).partial(),
]);

/* * */

export type Metric = z.infer<typeof MetricSchema>;
export type CreateMetricDto = z.infer<typeof CreateMetricSchema>;
export type UpdateMetricDto = z.infer<typeof UpdateMetricSchema>;
