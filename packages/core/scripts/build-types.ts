import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const originalPackageJson = JSON.parse(readFileSync(resolve(__dirname, '../package.json'), 'utf-8'));

const newPackageJson = {
	...originalPackageJson,
	exports: {
		'.': {
			import: './dist/core-types.mjs',
			require: './dist/core-types.js',
			types: './dist/core-types.d.ts',
		},
	},
	name: '@tmlmobilidade/core-types',
};

writeFileSync(resolve(__dirname, '../package.json'), JSON.stringify(newPackageJson, null, 2));
