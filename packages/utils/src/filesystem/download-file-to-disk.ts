/* * */

import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';

/**
 * This function downloads a file from a given URL and saves it to a specified directory on disk.
 * It first checks if the output directory exists, and if it does, it removes it to ensure a clean state.
 * Then, it creates the directory and downloads the file, saving it to the specified path.
 * @param downloadUrl - The URL of the file to be downloaded.
 * @param outputDir - The directory where the file should be saved.
 * @param outputFileName - The name of the file to be saved.
 * @return A promise that resolves to the path of the downloaded file.
 */
export async function downloadFileToDisk(downloadUrl: string, outputDir: string, outputFileName: string): Promise<string> {
	//

	if (existsSync(outputDir)) {
		rmSync(outputDir, { force: true, recursive: true });
	}

	mkdirSync(outputDir, { recursive: true });

	const fileData = await fetch(downloadUrl).then(response => response.blob());
	const fileBuffer = await fileData.arrayBuffer();

	const downloadedFilePath = `${outputDir}/${outputFileName}`;

	writeFileSync(downloadedFilePath, Buffer.from(fileBuffer));

	return downloadedFilePath;

	//
};
