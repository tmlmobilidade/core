import chalk from 'chalk';

export const logger = {
	clearPreviousLine() {
		process.stdout.moveCursor(0, -1);
		process.stdout.clearLine(1);
	},
	error(...args: unknown[]) {
		console.log(chalk.red(...args));
	},
	info(...args: unknown[]) {
		console.log(chalk.cyan(...args));
	},
	success(...args: unknown[]) {
		console.log(chalk.green(...args));
	},
	warn(...args: unknown[]) {
		console.log(chalk.yellow(...args));
	},
};
