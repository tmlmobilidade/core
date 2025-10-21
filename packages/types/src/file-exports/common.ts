/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

export const FILE_EXPORT_TYPES = ['ride'] as const;
export const FileExportTypeSchema = z.enum(FILE_EXPORT_TYPES);
export type FileExportType = z.infer<typeof FileExportTypeSchema>;

/* * */

export const CreateFileExportBaseSchema = DocumentSchema.extend({
	file_name: z.string(),
	properties: z.record(z.any()),
	type: FileExportTypeSchema,
}).strict();

export const FileExportBaseSchema = CreateFileExportBaseSchema.extend({
	file_size: z.number().describe('size in bytes'),
	mime_type: z.string().describe('mime type'),
	processing_status: ProcessingStatusSchema,
}).strict();
