/* * */

import { CreateRideExportSchema, RideExportSchema } from '@/file-exports/ride-export.js';
import { z } from 'zod';

/* * */

export type FileExport = z.infer<typeof FileExportSchema>;
export type CreateFileExportDto = z.infer<typeof CreateFileExportSchema>;

export { type FileExportType, FileExportTypeSchema } from './common.js';
export { parseRideToExport, type RideExportProperties, RideExportPropertiesSchema } from './ride-export.js';

/* * */

export const FileExportSchema = z.discriminatedUnion('type', [
	RideExportSchema,
]);

export const CreateFileExportSchema = z.discriminatedUnion('type', [
	CreateRideExportSchema,
]);
