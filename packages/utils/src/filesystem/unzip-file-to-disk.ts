/* * */

import { setDirectoryPermissions } from '@/filesystem/set-directory-permissions.js';
import extract from 'extract-zip';

/**
 * This function wraps the `extract-zip` library to unzip a file to a specified directory.
 * It also sets the permissions of the extracted files and directories to ensure they are accessible.
 * Since this function wirtes to the disk, it only works in a Node.js environment, not in the browser.
 * For a browser environment, please use the `JSZip` library.
 * @param zipFilePath - The path to the zip file to be extracted.
 * @param outputDir - The directory where the files should be extracted.
 * @returns - A promise that resolves when the extraction is complete.
 */
export async function unzipFileToDisk(zipFilePath: string, outputDir: string): Promise<void> {
	await extract(zipFilePath, { dir: outputDir });
	setDirectoryPermissions(outputDir);
};
