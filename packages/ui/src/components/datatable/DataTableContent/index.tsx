'use client';

/* * */

import { Props as DataTableProps } from '@/components/datatable/DataTable';
import { useDataTableContext } from '@/components/datatable/DataTableContext';
import { DataTableHeader } from '@/components/datatable/DataTableHeader';
import { DataTableRow } from '@/components/datatable/DataTableRow';
import { DataTableTitle } from '@/components/datatable/DataTableTitle';
import { cn, getValueAtPath } from '@/lib/utils';
import { Table } from '@mantine/core';
import { ViewportList } from 'react-viewport-list';

import styles from './styles.module.css';

/* * */

type Props<T> = Omit<DataTableProps<T>, 'records'>;

/* * */

export function DataTableContent<T>({ classnames, columns, maxHeight, onRowClick, onRowContextMenu, onRowDoubleClick, rowIdAccessor, search, title }: Props<T>) {
	//

	//
	// A. Setup Variables

	const dataTableContext = useDataTableContext<T>();

	//
	// B. Render Components

	return (
		<div className={cn(styles.root, classnames?.root)}>
			<DataTableTitle search={search} title={title ?? ''} />
			<div
				className={cn(styles.tableWrapper, classnames?.tableWrapper)}
				style={{ maxHeight: maxHeight || '100%' }}
			>
				<Table className={cn(styles.table, classnames?.table, 'block')}>
					<DataTableHeader columns={columns} />
					<Table.Tbody>
						<ViewportList itemMargin={0} items={dataTableContext.data.records}>
							{(record, rowIndex) => (
								<DataTableRow
									key={rowIdAccessor ? (getValueAtPath(record, rowIdAccessor) as string) : rowIndex}
									columns={columns}
									onRowClick={onRowClick}
									onRowContextMenu={onRowContextMenu}
									onRowDoubleClick={onRowDoubleClick}
									record={record}
								/>
							)}
						</ViewportList>
					</Table.Tbody>
				</Table>
			</div>
		</div>
	);

	//
}
