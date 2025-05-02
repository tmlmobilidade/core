/* * */

import { watch } from 'rollup';

import { buildStyles } from './build-styles';
import { rollupConfig } from './rollup/config';

/* * */

async function watchBuild() {
	console.log('Starting watch mode...');

	const config = rollupConfig();

	const watcher = watch(config);

	watcher.on('event', async (event) => {
		switch (event.code) {
			case 'BUNDLE_END':
				console.log('Bundle completed.');
				break;
			case 'BUNDLE_START':
				console.log('Bundling...');
				break;
			case 'END':
				console.log('Build finished.');
				buildStyles();
				break;
			case 'ERROR':
				console.error('Error:', event.error);
				break;
			case 'START':
				console.log('Building...');
				break;
			default:
				break;
		}
	});

	// Handle process termination
	process.on('SIGTERM', () => watcher.close());
	process.on('SIGINT', () => watcher.close());
	process.on('exit', () => watcher.close());

}

/* * */

watchBuild();
