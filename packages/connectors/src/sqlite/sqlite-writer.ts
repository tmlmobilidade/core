/* * */

import { SQLiteTableInstance } from '@/sqlite/sqlite-db.js';
import { type SQLiteTable } from '@/sqlite/types.js';
import { generateRandomString } from '@tmlmobilidade/utils';
import BSQLite3, { type Database } from 'better-sqlite3';

/* * */

export class SQLiteWriter<T> extends SQLiteTableInstance<T> {
	//

	//
	// Properties
	public readonly instanceName: string;
	public readonly instancePath: string;

	//
	// Constructor
	constructor(params: SQLiteTable<T>) {
		// 1. Generate a random table name
		const instanceName = generateRandomString({ type: 'alphabetic' });
		const instancePath = `/tmp/${instanceName}.db`;

		// 2. Create a fresh SQLite DB just for this writer
		const db = SQLiteWriter.createDatabase(instancePath);

		// 3. Call parent constructor (this does CREATE TABLE, prepare inserts, etc.)
		super(db, instanceName, params);

		// 4. Save references
		this.instanceName = instanceName;
		this.instancePath = instancePath;
	}

	//
	//  Methods

	private static createDatabase(path: string): Database {
		//
		// Set up the database
		const db = new BSQLite3(path);

		db.pragma('journal_mode = WAL');
		db.pragma('synchronous = OFF');
		db.pragma('temp_store = MEMORY');

		//
		// Return the database
		return db;
	}
}
