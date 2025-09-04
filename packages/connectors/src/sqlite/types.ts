/* * */

export interface SQLiteColumn<T> {
	indexed?: boolean
	name: Extract<keyof T, string>
	not_null?: boolean
	primary_key?: boolean
	type: 'BLOB' | 'INTEGER' | 'REAL' | 'TEXT'
}

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
	columns: SQLiteColumn<T>[]

}

export interface SQLiteTable<T> extends SQLiteWriterParams<T> {
	/**
	 * The name of the table.
	 */
	table_name: string
}
