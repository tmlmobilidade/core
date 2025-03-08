import { OutputOptions, rollup, RollupOptions } from 'rollup';

export async function compile(configs: RollupOptions | RollupOptions[]) {
	const configArray = Array.isArray(configs) ? configs : [configs];

	return Promise.all(
		configArray.map(async (config) => {
			const build = await rollup(config);
			const outputs: OutputOptions[] = Array.isArray(config.output) ? config.output : [config.output as OutputOptions];

			return Promise.all(outputs.map(output => build.write(output)));
		}),
	);
}

export default compile;
