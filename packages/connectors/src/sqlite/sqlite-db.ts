/* eslint-disable @typescript-eslint/no-explicit-any */
import BSQLite3, { type Database, Statement } from 'better-sqlite3';

import { SQLiteColumn, SQLiteTable } from './types.js';

/* * */

export class SQLiteDatabase {
	//

	//
	//  Properties

	public databaseInstance: Database;
	private tables = new Map<string, SQLiteTableInstance<any>>();

	//
	//  Constructor

	constructor(public instanceName: string, public instancePath = `/tmp/${instanceName}.db`) {
		this.databaseInstance = new BSQLite3(this.instancePath);

		this.databaseInstance.pragma('journal_mode = WAL');
		this.databaseInstance.pragma('synchronous = OFF');
		this.databaseInstance.pragma('temp_store = MEMORY');
	}

	/**
	 * Registers a new table and returns an object with methods for that table.
	 */
	public registerTable<T>(tableName: string, params: SQLiteTable<T>): SQLiteTableInstance<T> {
		if (this.tables.has(tableName)) {
			throw new Error(`Table "${tableName}" already registered`);
		}

		const tableInstance = new SQLiteTableInstance<T>(this.databaseInstance, tableName, params);
		this.tables.set(tableName, tableInstance);

		return tableInstance;
	}
}

/* * */

export class SQLiteTableInstance<T> {
	//

	/**
	 * Get the number of rows in the table.
	 * @returns The number of rows.
	 */
	get size(): number {
		const sql = `SELECT COUNT(*) as count FROM ${this.table_name}`;
		const row = this.databaseInstance.prepare(sql).get() as { count: number };
		return row.count;
	}

	//
	//  Constructor
	private batch: T[] = [];
	private batchSize = 3000;
	private columns: SQLiteColumn<T>[];
	private databaseInstance: Database;
	private insertStatement: Statement;

	private table_name: string;

	constructor(databaseInstance: Database, table_name: string, params: SQLiteTable<T>) {
		//

		//
		// Set up properties

		this.databaseInstance = databaseInstance;
		this.batchSize = params.batch_size ?? 3000;
		this.columns = params.columns;
		this.table_name = table_name;

		// Create table
		this.databaseInstance
			.prepare(`CREATE TABLE IF NOT EXISTS ${table_name} (${params.columns.map(c => `"${c.name}"`).join(', ')})`)
			.run();

		// Create indexes
		params.columns.forEach((c) => {
			if (c.indexed) {
				this.databaseInstance.exec(`CREATE INDEX IF NOT EXISTS idx_${table_name}_${c.name} ON ${table_name}("${c.name}")`);
			}
		});

		//
		// Prepare insert statement

		const placeholders = this.columns.map(() => '?').join(', ');
		const insertSQL = `INSERT INTO ${table_name} (${this.columns.map(c => `"${c.name}"`).join(', ')}) VALUES (${placeholders})`;
		this.insertStatement = this.databaseInstance.prepare(insertSQL);
	}

	all(whereClause = '', params: (boolean | number | string)[] = []): T[] {
		const sql = `SELECT * FROM ${this.table_name} ${whereClause}`;
		return this.databaseInstance.prepare(sql).all(...params) as T[];
	}

	/**
	 * Clears all entries from the map.
	 */
	clear(): void {
		this.databaseInstance
			.prepare(`DELETE FROM ${this.table_name}`)
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
				const rowValues = this.columns.map((col) => {
					const value = row[col.name];
					// Convert boolean to 0 or 1
					if (typeof value === 'boolean') {
						return value ? 1 : 0;
					}
					return value;
				});
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
		const sql = `SELECT * FROM ${this.table_name} WHERE ${String(col)} = ? LIMIT 1`;
		return this.databaseInstance.prepare(sql).get(value) as T | undefined;
	}

	/**
	 * Check if a row exists by column value.
	 * @param col The column to filter by.
	 * @param value The value to match.
	 * @returns True if the row exists, false otherwise.
	 */
	has<K extends keyof T>(col: K, value: T[K]): boolean {
		const sql = `SELECT 1 FROM ${this.table_name} WHERE ${String(col)} = ? LIMIT 1`;
		return !!this.databaseInstance.prepare(sql).get(value);
	}

	query(sqlQuery = '', params: (boolean | number | string)[] = []): T[] {
		return this.databaseInstance.prepare(sqlQuery).all(...params) as T[];
	}

	update(whereClause = '', newData: Partial<T>, params: (boolean | number | string)[] = []): T[] {
		const sql = `UPDATE ${this.table_name} SET ${Object.keys(newData).map(key => `${key} = ?`).join(', ')} WHERE ${whereClause}`;
		return this.databaseInstance.prepare(sql).all(...params) as T[];
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
