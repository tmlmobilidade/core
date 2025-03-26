import chalk from 'chalk';

import { PACKAGES_TO_UPGRADE, REPLACE_FILE_PATHS, TEMPLATE_STRING, TITLE_TEXT } from './consts.js';
import { copyApp, copyMonorepo, getAvailableApps, replaceInFile, upgradePackages } from './utils/copy.js';
import { logger } from './utils/logger.js';
import { getProjectName, getProjectScope, selectApps, selectProjectType } from './utils/prompts.js';

/* * */

export const renderTitle = () => {
	let text = TITLE_TEXT;

	text = text.replace(/▓/g, chalk.dim(chalk.yellow('▓')));
	text = text.replace(/ ▄▄▄ /g, chalk.yellow(' ▄▄▄ '));
	text = text.replace(/ ▀▀▀ /g, chalk.yellow(' ▀▀▀ '));
	text = text.replace(/▐▒▒▒▌/g, chalk.yellow('▐') + chalk.white('▒▒▒') + chalk.yellow('▌'));

	console.log(text);
};

async function main() {
	renderTitle();

	const projectType = await selectProjectType();

	if (projectType === 'monorepo') {
		const projectName = await getProjectName();
		const projectScope = await getProjectScope(projectName);
		const selectedApps = await selectApps(await getAvailableApps());

		logger.info('Copying monorepo...');
		await copyMonorepo(projectName);

		// Copy Selected Applications
		for (const app of selectedApps) {
			logger.info(`Copying ${app}...`);
			logger.clearPreviousLine();
			await copyApp(app, projectName + '/apps/' + app);

			// Replace template file paths
			if (REPLACE_FILE_PATHS[app]) {
				logger.info(`Replacing template file paths in ${app}...`);
				logger.clearPreviousLine();
				for (const filePath of REPLACE_FILE_PATHS[app]) {
					const filePathWithProjectName = projectName + '/apps/' + app + '/' + filePath;
					await replaceInFile(filePathWithProjectName, TEMPLATE_STRING, projectScope);
				}
			}

			// Upgrade Packages
			logger.info(`Upgrading packages in ${app}...`);
			logger.clearPreviousLine();
			await upgradePackages({
				packageJsonPath: projectName + '/apps/' + app + '/package.json',
				packages: PACKAGES_TO_UPGRADE,
			});
		}

		// Upgrade Packages in Root
		logger.info('Upgrading packages in root...');
		logger.clearPreviousLine();
		await upgradePackages({
			packageJsonPath: projectName + '/package.json',
			packages: PACKAGES_TO_UPGRADE,
		});

		return;
	}

	if (projectType === 'application') {
		const projectName = await getProjectName();
		const projectScope = await getProjectScope(projectName);

		logger.info('Copying application...');
		await copyApp(projectName, projectName);

		// Replace template file paths
		logger.info('Replacing template file paths...');
		logger.clearPreviousLine();
		if (REPLACE_FILE_PATHS[projectName]) {
			for (const filePath of REPLACE_FILE_PATHS[projectName]) {
				logger.info(`Replacing template file paths in ${filePath}...`);
				const filePathWithProjectName = projectName + '/' + filePath;
				await replaceInFile(filePathWithProjectName, TEMPLATE_STRING, projectScope);
			}
		}

		// Upgrade Packages
		logger.info('Upgrading packages...');
		logger.clearPreviousLine();
		await upgradePackages({
			packageJsonPath: projectName + '/package.json',
			packages: PACKAGES_TO_UPGRADE,
		});
		return;
	}
}

main().catch(console.error);
