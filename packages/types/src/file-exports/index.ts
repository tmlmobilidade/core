/* * */

import { CreateRideExportSchema, RideExportSchema } from '@/file-exports/ride-export.js';
import { z } from 'zod';

/* * */

export const FileExportSchema = z.discriminatedUnion('type', [
	RideExportSchema,
]);

export const CreateFileExportSchema = z.discriminatedUnion('type', [
	CreateRideExportSchema,
]);

/* * */

export type FileExport = z.infer<typeof FileExportSchema>;
export type CreateFileExportDto = Omit<FileExport, '_id' | 'created_at' | 'data' | 'updated_at'> & { processing_status: 'waiting' };
export type UpdateFileExportDto = Omit<CreateFileExportDto, 'created_by'> & { processing_status: 'complete' | 'error' | 'processing' };

export { parseRideToExport, type RideExportProperties, RideExportPropertiesSchema } from './ride-export.js';
