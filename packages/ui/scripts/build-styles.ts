/* * */

import fs from 'fs';
// import path from 'path';

/* * */

// const __filename = new URL(import.meta.url).pathname;
// const __dirname = path.dirname(__filename);

// const rootDir = path.resolve(__dirname, '..', '..', '..');

export function buildStyles() {
	// Read all necessary files first
	const indexCss = fs.readFileSync('dist/index.css');
	const resetCss = fs.readFileSync('src/styles/reset.css');
	const themes = fs.readdirSync('src/styles/themes');

	const themeContents = themes.map(theme => fs.readFileSync(`src/styles/themes/${theme}`));

	// const mantineStyles = fs.readFileSync(path.resolve(rootDir, 'node_modules/@mantine/core/styles.layer.css'));
	// const mantineNotificationsStyles = fs.readFileSync(path.resolve(rootDir, 'node_modules/@mantine/notifications/styles.layer.css'));
	// const mantineDatesStyles = fs.readFileSync(path.resolve(rootDir, 'node_modules/@mantine/dates/styles.layer.css'));

	// Concatenate all contents
	const allStyles = Buffer.concat([resetCss, Buffer.from('\n'), indexCss, Buffer.from('\n'), ...themeContents.flatMap(theme => [theme, Buffer.from('\n')])]); // , mantineStyles, mantineNotificationsStyles, mantineDatesStyles]);
	const noResetStyles = Buffer.concat([indexCss, ...themeContents]); // , mantineStyles, mantineNotificationsStyles, mantineDatesStyles]);

	// Write all styles to the destination file
	fs.writeFileSync('dist/styles.css', allStyles);
	fs.writeFileSync('dist/styles-no-reset.css', noResetStyles);

	// Remove unnecessary files
	fs.rmSync('dist/index.css');
	// fs.rmSync('dist/cjs/index.css');
}
