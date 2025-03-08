'use client';

/* * */

import { cn } from '@/lib/utils';
import { getValueAtPath } from '@/lib/utils';
import { Table } from '@mantine/core';

import { DataTableRowProps } from '../datatable.type';
import styles from './styles.module.css';

export default function DataTableRow<T = Record<string, unknown>>({
	columns,
	onRowClick,
	onRowContextMenu,
	onRowDoubleClick,
	record,
}: DataTableRowProps<T> & {
	onRowClick?: (record: T) => void
	onRowContextMenu?: (record: T) => void
	onRowDoubleClick?: (record: T) => void
}) {
	return (
		<Table.Tr
			className={cn(styles.row)}
			onClick={() => onRowClick && onRowClick(record)}
			onContextMenu={() => onRowContextMenu && onRowContextMenu(record)}
			onDoubleClick={() => onRowDoubleClick && onRowDoubleClick(record)}
		>
			{columns.map((column, colIndex) => (
				<Table.Td
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
				</Table.Td>
			))}
		</Table.Tr>
	);
}
