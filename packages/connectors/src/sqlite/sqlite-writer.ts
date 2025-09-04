/* * */

import { generateRandomString } from '@tmlmobilidade/utils';
import BSQLite3, { type Database, type Statement } from 'better-sqlite3';

/* * */

interface SQLiteWriterColumn<T> {
	indexed?: boolean
	name: Extract<keyof T, string>
	not_null?: boolean
	primary_key?: boolean
	type: 'BLOB' | 'INTEGER' | 'REAL' | 'TEXT'
}

/* * */

export interface SQLiteWriterParams<T> {

	/**
	 * The maximum number of items to hold in memory
	 * before flushing to the database.
	 * @default 3000
	 */
	batch_size?: number

	/**
	 * Columns in the table.
	 * Order matters for INSERT.
	 * Must be keys of T or custom names.
	 */
	columns: SQLiteWriterColumn<T>[]

}

/* * */

export class SQLiteWriter<T> {
	//

	/**
	 * Get the instance path.
	 * @returns The instance path.
	 */
	get instancePath(): string {
		return `/tmp/${this.instanceName}.db`;
	}

	/**
	 * Get the number of rows in the table.
	 * @returns The number of rows.
	 */
	get size(): number {
		const sql = `SELECT COUNT(*) as count FROM ${this.instanceName}`;
		const row = this.databaseInstance.prepare(sql).get() as { count: number };
		return row.count;
	}

	private batch: T[] = [];
	private batchSize = 3000;
	private columns: SQLiteWriterColumn<T>[];
	private databaseInstance: Database;
	private insertStatement: Statement;
	private instanceName: string;

	constructor(params: SQLiteWriterParams<T>) {
		//

		//
		// Set up options

		this.batchSize = params.batch_size ?? 3000;

		this.columns = params.columns;

		this.instanceName = generateRandomString({ type: 'alphabetic' });

		//
		// Create a new SQLite instance

		this.databaseInstance = new BSQLite3(this.instancePath);

		//
		// Setup table columns from params

		const preparedColumns: string[] = [];
		const preparedIndexes: string[] = [];

		for (const columnSpec of this.columns) {
			// Extract column definition
			const parts: string[] = [`"${columnSpec.name}"`, columnSpec.type];
			// Set column preferences
			if (columnSpec.not_null) parts.push('NOT NULL');
			if (columnSpec.primary_key) parts.push('PRIMARY KEY');
			// Save the column definition
			preparedColumns.push(parts.join(' '));
			// Save the index definition
			if (columnSpec.indexed) preparedIndexes.push(`CREATE INDEX IF NOT EXISTS idx_${this.instanceName}_${columnSpec.name} ON ${this.instanceName}("${columnSpec.name}")`);
		}

		//
		// Create the table with the prepared columns and indexes

		this.databaseInstance.pragma('journal_mode = WAL');
		this.databaseInstance.pragma('synchronous = OFF');
		this.databaseInstance.pragma('temp_store = MEMORY');

		this.databaseInstance
			.prepare(`CREATE TABLE IF NOT EXISTS ${this.instanceName} (${preparedColumns.join(',\n')})`)
			.run();

		preparedIndexes.forEach(i => this.databaseInstance.exec(i));

		//
		// Prepare insert statement

		const placeholders = this.columns.map(() => '?').join(', ');
		const insertSQL = `INSERT INTO ${this.instanceName} (${this.columns.map(c => `"${c.name}"`).join(', ')}) VALUES (${placeholders})`;
		this.insertStatement = this.databaseInstance.prepare(insertSQL);

		//
	}

	all(whereClause = '', params: (boolean | number | string)[] = []): T[] {
		const sql = `SELECT * FROM ${this.instanceName} ${whereClause}`;
		return this.databaseInstance.prepare(sql).all(...params) as T[];
	}

	/**
	 * Clears all entries from the map.
	 */
	clear(): void {
		this.databaseInstance
			.prepare(`DELETE FROM ${this.instanceName}`)
			.run();
	}

	/**
	 * Flush current buffer into DB synchronously.
	 */
	flush(): void {
		// Skip if batch is empty
		if (this.batch.length === 0) return;
		// Prepare the operation
		const insertManyOperation = this.databaseInstance.transaction((rows: T[]) => {
			rows.forEach((row) => {
				// Populate the columns with the row values
				// to ensure the order of placeholders is preserved
				const rowValues = this.columns.map(col => row[col.name]);
				this.insertStatement.run(rowValues);
			});
		});
		// Run the operation
		insertManyOperation(this.batch);
		// Empty batch
		this.batch = [];
	}

	/**
	 * Get a single row by column value.
	 * @param col The column to filter by.
	 * @param value The value to match.
	 * @returns The matching row, or undefined if not found.
	 */
	get<K extends keyof T>(col: K, value: T[K]): T | undefined {
		const sql = `SELECT * FROM ${this.instanceName} WHERE ${String(col)} = ? LIMIT 1`;
		return this.databaseInstance.prepare(sql).get(value) as T | undefined;
	}

	/**
	 * Check if a row exists by column value.
	 * @param col The column to filter by.
	 * @param value The value to match.
	 * @returns True if the row exists, false otherwise.
	 */
	has<K extends keyof T>(col: K, value: T[K]): boolean {
		const sql = `SELECT 1 FROM ${this.instanceName} WHERE ${String(col)} = ? LIMIT 1`;
		return !!this.databaseInstance.prepare(sql).get(value);
	}

	/**
	 * Add one item to buffer, flush automatically when batchSize reached.
	 */
	write(item: T): void {
		this.batch.push(item);
		if (this.batch.length >= this.batchSize) this.flush();
	}

	//
}
