import { TITLE_TEXT } from './consts';
import { getAvailableApps } from './utils/copy';
import { getProjectName, selectApps, selectProjectType } from './utils/prompts';
/* * */

async function main() {
	console.log(TITLE_TEXT);

	const projectType = await selectProjectType();

	if (projectType === 'monorepo') {
		const projectName = await getProjectName();
		const selectedApps = await selectApps(await getAvailableApps());
		console.log('MONOREPO', projectName, selectedApps);
		return;
	}

	if (projectType === 'application') {
		const projectName = await getProjectName();
		console.log('APPLICATION', projectName);
		return;
	}
}

main().catch(console.error);
