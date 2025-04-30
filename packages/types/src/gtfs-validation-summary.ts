import { z } from 'zod';

/* * */

export const SEVERITY_LEVELS = ['error', 'warning', 'info'] as const;
export const SeverityLevelSchema = z.enum(SEVERITY_LEVELS);
export type SeverityLevel = z.infer<typeof SeverityLevelSchema>;

export const GTFSValidatorMessageSchema = z.object({
	field: z.string(),
	fileName: z.string(),
	message: z.string(),
	rows: z.array(z.number()),
	severity: SeverityLevelSchema,
	validation_id: z.string(),
});

export const GTFSValidatorSummarySchema = z.object({
	messages: z.array(GTFSValidatorMessageSchema),
	total_errors: z.number(),
	total_infos: z.number(),
	total_warnings: z.number(),
});

export type GTFSValidatorSummary = z.infer<typeof GTFSValidatorSummarySchema>;
export type GTFSValidatorMessage = z.infer<typeof GTFSValidatorMessageSchema>;
