/* * */

import { z } from 'zod';

import { RideExportSchema } from './ride-export.js';

/* * */

export const FileExportSchema = z.discriminatedUnion('type', [
	RideExportSchema,
]);

/* * */

export type FileExport = z.infer<typeof FileExportSchema>;
