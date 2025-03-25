/* * */

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { type RollupOptions } from 'rollup';
import { dts } from 'rollup-plugin-dts';
import postcss from 'rollup-plugin-postcss';
import tsConfigPaths from 'rollup-plugin-tsconfig-paths';
import { preserveDirective } from 'rollup-preserve-directives';

import packageJson from '../../package.json';

/* * */

// List of peer dependencies
const external = [
	...Object.keys(packageJson.peerDependencies || {}),
	...Object.keys(packageJson.dependencies || {}),
];

/* * */

export function rollupConfig(): RollupOptions[] {
	return [
		{
			external,
			input: 'src/index.ts',
			output: [
				{
					dir: 'dist/src',
					format: 'esm',
					preserveModules: true,
					preserveModulesRoot: 'src',
					sourcemap: true,
				},
			],
			plugins: [
				tsConfigPaths(),
				nodeResolve({
					allowExportsFolderMapping: false,
				}),
				preserveDirective(),
				commonjs(),
				typescript({
					declarationDir: 'dist/src',
					exclude: ['**/*.test.tsx', '**/*.test.ts', '**/*.stories.tsx', '**/*.stories.ts', 'scripts/**'],
					outDir: 'dist/src',
					tsconfig: './tsconfig.json',
				}),
				postcss({
					extract: 'index.css',
					modules: true,
				}),
			],
		},
		{
			external: [/\.css$/],
			input: 'src/index.ts',
			output: [{ file: 'dist/index.d.ts', format: 'esm' }],
			plugins: [
				tsConfigPaths(),
				dts(),
			],
		},
	];
}
