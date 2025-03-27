'use client';

/* * */

import ActionIcon from '@/components/common/ActionIcon';
import { DataTableColumn } from '@/components/datatable/datatable.type';
import { useDataTableContext } from '@/components/datatable/DataTableContext';
import { cn } from '@/lib/utils';
import { Table } from '@mantine/core';
import { IconArrowDownRhombus, IconArrowsUpDown, IconArrowUpRhombus } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface Props<T = Record<string, unknown>> {
	/**
	 * The columns to be displayed in the table header.
	 */
	columns: DataTableColumn<T>[]
}

/* * */

export function DataTableHeader<T = Record<string, unknown>>({ columns }: Props<T>) {
	//

	//
	// A. Setup variables

	const { actions: { handleSort }, filters: { sortState } } = useDataTableContext<T>();

	//
	// B. Render components

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

	//
}
