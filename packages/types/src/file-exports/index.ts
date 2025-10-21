/* * */

import { RideExportSchema } from '@/file-exports/ride-export.js';
import { z } from 'zod';

/* * */

export type FileExport = z.infer<typeof FileExportSchema>;

export { type FileExportType, FileExportTypeSchema } from './common.js';
export { type RideExportData, type RideExportProperties, RideExportPropertiesSchema, RideExportSchema } from './ride-export.js';

/* * */

export const FileExportSchema = z.discriminatedUnion('type', [
	RideExportSchema,
]);
