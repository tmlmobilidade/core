'use client';

/* * */
import { cn } from '@/lib/utils';
import { Table } from '@mantine/core';
import {
	IconArrowDownRhombus,
	IconArrowsUpDown,
	IconArrowUpRhombus,
} from '@tabler/icons-react';

import ActionIcon from '../../common/ActionIcon';
import { DataTableColumn, DataTableHeaderProps } from '../datatable.type';
import { useDataTableContext } from '../DataTableContext';
import styles from './styles.module.css';
/* * */

export default function DataTableHeader<T = Record<string, unknown>>({
	columns,
}: DataTableHeaderProps<T>) {
	//
	// A. Setup Variables

	const {
		actions: { handleSort },
		filters: { sortState },
	} = useDataTableContext<T>();

	//
	// C. Render Components

	const renderSortIcon = (column: DataTableColumn<T>) => {
		if (!column.sortable) return null;

		return (
			<ActionIcon variant="muted">
				{sortState?.accessor === column.accessor ? (
					sortState.order === 'asc' ? (
						<IconArrowUpRhombus size={18} />
					) : sortState.order === 'desc' ? (
						<IconArrowDownRhombus size={18} />
					) : (
						<IconArrowsUpDown size={18} />
					)
				) : (
					<IconArrowsUpDown size={18} />
				)}
			</ActionIcon>
		);
	};

	return (
		<Table.Thead className={cn(styles.header)}>
			<Table.Tr className={cn(styles.row)}>
				{columns.map((column, idx) => (
					<Table.Th
						key={idx}
						className={cn(styles.cell)}
						style={{
							maxWidth: column.width,
							minWidth: column.width ?? 'max-content',
						}}
					>
						<div
							className={styles.cellContent}
							onClick={() =>
								column.sortable
								&& handleSort(column.sortKey ?? String(column.accessor))}
						>
							{column.title}
							{column.sortable && renderSortIcon(column)}
						</div>
					</Table.Th>
				))}
			</Table.Tr>
		</Table.Thead>
	);
}
