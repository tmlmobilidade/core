/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

export const FILE_EXPORT_TYPES = ['ride'] as const;
export const FileExportTypeSchema = z.enum(FILE_EXPORT_TYPES);

/**
 * This type should be used to represent the processing status
 * of various operations. It can be used in APIs, database operations,
 * or any other context where a processing status needs to be communicated.
*/
export type FileExportType = z.infer<typeof FileExportTypeSchema>;

/* * */

export const CreateFileExportBaseSchema = DocumentSchema.extend({
	type: FileExportTypeSchema,
}).strict();

export const FileExportBaseSchema = DocumentSchema.extend({
	file_name: z.string(),
	file_size: z.number().describe('size in bytes'),
	metadata: z.record(z.unknown()).nullish(),
	mime_type: z.string().describe('mime type'),
	processing_status: ProcessingStatusSchema,
	type: FileExportTypeSchema,
}).strict();
