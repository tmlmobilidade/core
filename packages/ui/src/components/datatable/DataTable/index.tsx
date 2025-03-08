'use client';

import { cn, getValueAtPath } from '@/lib/utils';
import { Table } from '@mantine/core';
import { ViewportList } from 'react-viewport-list';

import { DataTableProps } from '../datatable.type';
import { DataTableProvider, useDataTableContext } from '../DataTableContext';
import DataTableHeader from '../DataTableHeader';
import DataTableRow from '../DataTableRow';
import DataTableTitle from '../DataTableTitle';
import styles from './styles.module.css';

type DataTableContentProps<T> = DataTableProps<T>;

export default function DataTable<T>({ records, ...props }: DataTableProps<T>) {
	return (
		<DataTableProvider
			initialRecords={records}
			searchAccessors={props.search?.accessors ?? []}
		>
			<DataTableContent {...props} />
		</DataTableProvider>
	);
}

function DataTableContent<T>({
	classnames,
	columns,
	maxHeight,
	onRowClick,
	onRowContextMenu,
	onRowDoubleClick,
	rowIdAccessor,
	search,
	title,
}: Omit<DataTableContentProps<T>, 'records'>) {
	//

	//
	// A. Setup Variables
	const { data } = useDataTableContext<T>();

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
						<ViewportList itemMargin={0} items={data.records}>
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
}
