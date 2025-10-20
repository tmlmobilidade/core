/* * */

import { DocumentSchema } from '@/_common/document.js';
import { ProcessingStatusSchema } from '@/system/processing-status.js';
import { z } from 'zod';

/* * */

export const FileExportBaseSchema = DocumentSchema.extend({
	file_name: z.string(),
	file_size: z.number().describe('size in bytes'),
	metadata: z.record(z.unknown()).nullish(),
	mime_type: z.string().describe('mime type'),
	processing_status: ProcessingStatusSchema,
	scope: z.string(),
	type: z.string(),
}).strict();
