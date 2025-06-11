/* * */

import { mimeTypes } from '@tmlmobilidade/lib';

/**
 * Utility function to get the file extension from a file name
 * @param fileName - The name of the file
 * @returns The extension of the file
 */
export function getFileExtension(fileName: string): string {
	const extension = fileName.split('.').pop();
	if (!extension) {
		throw new Error('File has no extension');
	}

	const mimeType = mimeTypes[extension];
	if (!mimeType) {
		throw new Error(`Unsupported file extension: ${extension}`);
	}

	return extension;
}
