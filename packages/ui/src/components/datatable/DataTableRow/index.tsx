'use client';

/* * */

import { DataTableColumn } from '@/components/datatable/datatable.type';
import { cn } from '@/lib/utils';
import { getValueAtPath } from '@/lib/utils';

import styles from './styles.module.css';

/* * */

interface Props<T = Record<string, unknown>> {

	/**
	 * The column configuration for the row.
	 */
	columns: DataTableColumn<T>[]

	/**
	 * The data record for the row.
	 */
	record: T

}

/* * */

export function DataTableRow<T = Record<string, unknown>>({ columns, onRowClick, onRowContextMenu, onRowDoubleClick, record }: Props<T> & { onRowClick?: (record: T) => void, onRowContextMenu?: (record: T) => void, onRowDoubleClick?: (record: T) => void }) {
	return (
		<div
			className={cn(styles.row)}
			onClick={() => onRowClick && onRowClick(record)}
			onContextMenu={() => onRowContextMenu && onRowContextMenu(record)}
			onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(record)}
		>
			{columns.map((column, colIndex) => (
				<div
					key={colIndex}
					className={cn(styles.cell, column.width ? styles.maxWidth : styles.fullWidth)}
					style={{
						maxWidth: column.width,
						minWidth: column.width,
					}}
				>
					{column.render
						? column.render(record)
						: getValueAtPath(record, column.accessor) === null
							? null
							: String(getValueAtPath(record, column.accessor))}
				</div>
			))}
		</div>
	);
}
