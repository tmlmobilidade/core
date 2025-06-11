/* * */

import { chmodSync, readdirSync } from 'node:fs';

/**
 * This function recursively sets the permissions of all files in a directory to the specified mode.
 * It uses the `fs` module to read the directory and change the permissions of each file.
 * By default, it sets the permissions to `0o666`, which allows read and write access for the owner, group, and others.
 * @param dirPath - The path to the directory whose files' permissions should be set.
 * @param mode - The permission mode to set for the files. Default is `0o666`.
 */
export function setDirectoryPermissions(dirPath: string, mode = 0o666) {
	const files = readdirSync(dirPath, { withFileTypes: true });
	for (const file of files) {
		const filePath = `${dirPath}/${file.name}`;
		if (file.isDirectory()) {
			setDirectoryPermissions(filePath, mode);
		}
		else {
			chmodSync(filePath, mode);
		}
	}
};
