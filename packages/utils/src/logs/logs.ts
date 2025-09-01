/* * */

interface LogColumn {

	/**
	 * Column alignment.
	 */
	align?: 'left' | 'right'

	/**
	 * Column width.
	 */
	cols?: number

	/**
	 * Column text.
	 */
	txt: string

}

/* * */

class LogsClass {
	//

	/**
	 * Logs a divider line in the console.
	 * @param message Optional message to display.
	 * @param size Width of the divider line. Default is `75`.
	 */
	divider(message?: string, size = 75) {
		console.log();
		if (message) console.log(`- ${message} ${'-'.repeat(size - 2 - message.length < 1 ? 1 : size - 2 - message.length)}`);
		else console.log('-'.repeat(size));
		console.log();
	}

	/**
	 * Logs an error message in the console.
	 * @param message Error message to display.
	 * @param error Optional error object to display.
	 * @param spacesAfter Optional number of blank lines to add after the message.
	 * @param spacesBefore Optional number of blank lines to add before the message.
	 */
	error(message: string, error?: Error, spacesAfter?: number, spacesBefore?: number) {
		if (spacesBefore && spacesBefore > 0) this.spacer(spacesBefore);
		if (Array.isArray(message)) console.error(`✘ ${this.formatColumns(message)}`, error ?? '');
		else console.error(`✘ ${message}`, error ?? '');
		if (spacesAfter && spacesAfter > 0) this.spacer(spacesAfter);
	}

	/**
	 * Logs an informational message in the console.
	 * @param message Informational message to display.
	 * @param spacesAfter Optional number of blank lines to add after the message.
	 * @param spacesBefore Optional number of blank lines to add before the message.
	 */
	info(message: LogColumn[] | string, spacesAfter?: number, spacesBefore?: number) {
		if (spacesBefore && spacesBefore > 0) this.spacer(spacesBefore);
		if (Array.isArray(message)) console.log(`→ ${this.formatColumns(message)}`);
		else console.log(`→ ${message}`);
		if (spacesAfter && spacesAfter > 0) this.spacer(spacesAfter);
	}

	/**
	 * Initial message for program startup.
	 */
	init() {
		const currentDate = new Date().toISOString();
		console.log();
		console.log('-'.repeat(currentDate.length));
		console.log(currentDate);
		console.log('-'.repeat(currentDate.length));
		console.log();
	}

	/**
	 * Logs a progress message in the console.
	 * @param message Progress message to display.
	 * @param spacesAfter Optional number of blank lines to add after the message.
	 * @param spacesBefore Optional number of blank lines to add before the message.
	 */
	progress(message: LogColumn[] | string, spacesAfter?: number, spacesBefore?: number) {
		if (spacesBefore && spacesBefore > 0) this.spacer(spacesBefore);
		if (Array.isArray(message)) console.log(`• ${this.formatColumns(message)}`);
		else console.log(`• ${message}`);
		if (spacesAfter && spacesAfter > 0) this.spacer(spacesAfter);
	}

	/**
	 * Logs a spacer line in the console.
	 * @param lines Number of blank lines to add. Default is `1`.
	 */
	spacer(lines = 1) {
		for (let i = 0; i < lines; i++) {
			console.log();
		}
	}

	/**
	 * Logs a success message in the console.
	 * @param message Success message to display.
	 * @param spacesAfter Optional number of blank lines to add after the message.
	 * @param spacesBefore Optional number of blank lines to add before the message.
	 */
	success(message: string, spacesAfter?: number, spacesBefore?: number) {
		if (spacesBefore && spacesBefore > 0) this.spacer(spacesBefore);
		if (Array.isArray(message)) console.log(`✓ ${this.formatColumns(message)}`);
		else console.log(`✓ ${message}`);
		if (spacesAfter && spacesAfter > 0) this.spacer(spacesAfter);
	}

	/**
	 * Logs a termination message in the console.
	 * @param message Termination message to display.
	 */
	terminate(message: string) {
		console.log();
		console.log('-'.repeat(message.length));
		console.log(message);
		console.log('-'.repeat(message.length));
		console.log();
	}

	/**
	 * Logs a title message in the console.
	 * @param message Title message to display.
	 */
	title(message: string) {
		console.log();
		console.log(`▶︎ ${message}`);
		console.log();
	}

	/**
	 * Formats an array of log columns or strings into a single string.
	 * @param columns Array of log columns or strings to format.
	 * @returns Formatted string.
	 */
	private formatColumns(columns: (LogColumn | string)[]): string {
		return columns
			.map((item) => {
				if (typeof item === 'string') return item;
				if (!item.cols) return item.txt;
				if (item.align === 'right') return item.txt.padStart(item.cols);
				return item.txt.padEnd(item.cols);
			})
			.join(' ');
	}

	//
}

/**
 * Logger class for structured logging.
 */
export const Logs = new LogsClass();
