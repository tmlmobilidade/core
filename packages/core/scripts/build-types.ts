/* eslint-disable perfectionist/sort-objects */
import { readFileSync, writeFileSync } from 'fs';
import path, { resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const originalPackageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const newPackageJson = {
	...originalPackageJson,
	exports: {
		'.': {
			types: './dist/core-types.d.ts',
			import: './dist/core-types.js',
		},
	},
	name: '@tmlmobilidade/core-types',
};

writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(newPackageJson, null, 2));
