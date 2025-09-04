/* eslint-disable @typescript-eslint/no-explicit-any */
/* * */

import BSQLite3, { type Database } from 'better-sqlite3';

import { SQLiteTable } from './types.js';

/* * */

export class SQLiteMultiWriter {
	//

	//
	//  properties

	public instanceName: string;
	public instancePath: string;

	private databaseInstance: Database;
	private tables = new Map<string, SQLiteTable<any>>();
	private tablesBuffer = new Map<string, any[]>();

	//
	//  Constructor

	constructor(instanceName: string, instancePath?: string) {
		this.instanceName = instanceName;
		this.instancePath = instancePath ?? `/tmp/${instanceName}.db`;

		this.databaseInstance = new BSQLite3(this.instancePath);

		this.databaseInstance.pragma('journal_mode = WAL');
		this.databaseInstance.pragma('synchronous = OFF');
		this.databaseInstance.pragma('temp_store = MEMORY');
	}

	//
	//  Public methods

	/**
     * Gets all rows from a table.
     *
     * @template T - The type of the table's row data.
     * @param tableName - The name of the table to get rows from.
     * @param whereClause - The where clause to filter the rows.
     * @param params - The parameters to bind to the where clause.
     * @returns All rows from the table.
     */
	public all<T>(tableName: string, whereClause = '', params: (boolean | number | string)[] = []): T[] {
		const sql = `SELECT * FROM ${tableName} ${whereClause}`;
		return this.databaseInstance.prepare(sql).all(...params) as T[];
	}

	/**
	 * Clears all entries from a table.
	 * @param tableName The name of the table to clear.
	 */
	public clear(tableName: string): void {
		this.databaseInstance
			.prepare(`DELETE FROM ${tableName}`)
			.run();
	}

	/**
	 * Flush the buffer for a table.
	 * @param tableName The name of the table to flush.
	 */
	public flush(tableName: string): void {
		const batch = this.tablesBuffer.get(tableName) ?? [];
		const tableConfig = this.tables.get(tableName) as SQLiteTable<any>;

		// Skip if batch is empty
		if (batch.length === 0) return;
		// Prepare the operation
		const insertManyOperation = this.databaseInstance.transaction((rows: any[]) => {
			rows.forEach((row) => {
				// Populate the columns with the row values
				// to ensure the order of placeholders is preserved
				const rowValues = tableConfig.columns.map(col => row[col.name]);

				const placeholders = tableConfig.columns.map(() => '?').join(', ');
				const insertSQL = `INSERT INTO ${tableName} (${tableConfig.columns.map(c => `"${c.name}"`).join(', ')}) VALUES (${placeholders})`;
				this.databaseInstance.prepare(insertSQL).run(rowValues);
			});
		});
		// Run the operation
		insertManyOperation(batch);
		// Empty batch
		this.tablesBuffer.set(tableName, []);
	}

	/**
	 * Get a single row by column value.
	 * @param tableName The name of the table to get the row from.
	 * @param col The column to filter by.
	 * @param value The value to match.
	 * @returns The matching row, or undefined if not found.
	 */
	public get<T>(tableName: string, col: keyof T, value: T[keyof T]): T | undefined {
		const sql = `SELECT * FROM ${tableName} WHERE ${String(col)} = ? LIMIT 1`;
		return this.databaseInstance.prepare(sql).get(value) as T | undefined;
	}

	/**
	 * Check if a row exists by column value.
	 * @param tableName The name of the table to check.
	 * @param col The column to filter by.
	 * @param value The value to match.
	 * @returns True if the row exists, false otherwise.
	 */
	public has<T>(tableName: string, col: keyof T, value: T[keyof T]): boolean {
		const sql = `SELECT 1 FROM ${tableName} WHERE ${String(col)} = ? LIMIT 1`;
		return !!this.databaseInstance.prepare(sql).get(value);
	}

	/**
	 * Registers a new table in the SQLite database.
	 *
	 * @template T - The type of the table's row data.
	 * @param tableName - The name of the table to register.
	 * @param params - Configuration parameters for the table, including columns and batch size.
	 * @throws Will throw an error if the table is already registered.
	 */
	public registerTable<T>(tableName: string, params: SQLiteTable<T>): void {
		// Check if table already exists
		if (this.tables.has(tableName)) {
			throw new Error(`Table "${tableName}" already registered`);
		}

		// Register table
		this.databaseInstance
			.prepare(`CREATE TABLE IF NOT EXISTS ${params.table_name} (${params.columns.map(c => `"${c.name}"`).join(',\n')})`)
			.run();

		// Register table
		this.tables.set(tableName, params);

		// Create indexes for columns that require it
		params.columns.forEach((c) => {
			if (c.indexed) {
				this.databaseInstance.exec(`CREATE INDEX IF NOT EXISTS idx_${params.table_name}_${c.name} ON ${params.table_name}("${c.name}")`);
			}
		});
	}

	/**
     * Add one item to table.
	 * @param tableName The name of the table to add the item to.
	 * @param item The item to add.
	 */
	public write<T>(tableName: string, item: T): void {
		this.tablesBuffer.set(tableName, [...(this.tablesBuffer.get(tableName) ?? []), item]);

		const tableConfig = this.tables.get(tableName) as SQLiteTable<T>;
		const batch = this.tablesBuffer.get(tableName) as T[];
		const batchSize = tableConfig.batch_size ?? 3000;

		if (batch.length >= batchSize) {
			this.flush(tableName);
		}
	}
}
