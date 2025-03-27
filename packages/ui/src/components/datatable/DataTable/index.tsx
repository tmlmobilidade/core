'use client';

/* * */

import { DataTableProps } from '@/components/datatable/datatable.type';
import { DataTableContent } from '@/components/datatable/DataTableContent';
import { DataTableContextProvider } from '@/components/datatable/DataTableContext';

/* * */

export function DataTable<T>({ records, ...props }: DataTableProps<T>) {
	return (
		<DataTableContextProvider
			initialRecords={records}
			searchAccessors={props.search?.accessors ?? []}
		>
			<DataTableContent {...props} />
		</DataTableContextProvider>
	);
}
