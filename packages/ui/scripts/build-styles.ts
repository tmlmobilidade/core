/* * */

import fs from 'node:fs';

/* * */

export function buildStyles() {
	// Read all necessary files first
	const indexCss = fs.readFileSync('dist/index.css');
	const resetCss = fs.readFileSync('src/styles/reset.css');
	// const themes = fs.readdirSync('src/styles/themes');

	// const themeContents = themes.map(theme => fs.readFileSync(`src/styles/themes/${theme}`));

	// Concatenate all contents
	// const allStyles = Buffer.concat([resetCss, Buffer.from('\n'), indexCss, Buffer.from('\n'), ...themeContents.flatMap(theme => [theme, Buffer.from('\n')])]);
	const allStyles = Buffer.concat([resetCss, Buffer.from('\n'), indexCss, Buffer.from('\n')]);
	// const noResetStyles = Buffer.concat([indexCss, ...themeContents]);
	const noResetStyles = Buffer.concat([indexCss]);

	// Write all styles to the destination file
	fs.writeFileSync('dist/styles.css', allStyles);
	fs.writeFileSync('dist/styles-no-reset.css', noResetStyles);

	// Remove unnecessary files
	fs.rmSync('dist/index.css');
}
