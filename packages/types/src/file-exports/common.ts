/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

export const FILE_EXPORT_TYPES = ['ride'] as const;
export const FileExportTypeSchema = z.enum(FILE_EXPORT_TYPES);
export type FileExportType = z.infer<typeof FileExportTypeSchema>;

/* * */

export const FileExportBaseSchema = DocumentSchema.extend({
	file_id: z.string().nullable(),
	file_name: z.string(),
	processing_status: ProcessingStatusSchema,
	properties: z.record(z.any()),
	type: FileExportTypeSchema,
}).strict();
