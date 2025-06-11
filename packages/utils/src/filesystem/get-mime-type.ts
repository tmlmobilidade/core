/* * */

import { getFileExtension } from '@/filesystem/get-file-extension.js';
import { mimeTypes } from '@tmlmobilidade/lib';

/**
 * Utility function to get the mime type from a file name
 * @param fileName - The name of the file
 * @returns The mime type of the file
 */
export function getMimeType(fileName: string): string {
	const extension = getFileExtension(fileName);
	return mimeTypes[extension];
}
