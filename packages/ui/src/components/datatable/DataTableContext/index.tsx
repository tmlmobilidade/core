'use client';

/* * */

import { DataTableColumn, DataTableSearchProps } from '@/components/datatable/datatable.type';
import { useSearchQuery } from '@/hooks/search/use-search';
import { tryParseDateToTimestamp } from '@/lib/utils';
import { getValueAtPath } from '@/lib/utils';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/* * */

interface DataTableContextState<T> {
	actions: {
		clearSearchQuery: () => void
		handleSort: (accessor: string) => void
		handleUpdateColumnWidth: (column: string, width: number) => void
		updateFilterBySearchQuery: (query: string) => void
	}
	data: {
		column_widths?: Record<string, number>
		initial_records: T[]
		records: T[]
	}
	filters: {
		search_query?: string
		sort_state: null | SortState
	}
}

// Define the props for the provider component
interface DataTableProviderProps<T> {
	children: ReactNode
	columns: DataTableColumn<T>[]
	initialRecords: T[]
	searchAccessors: DataTableSearchProps<T>['accessors']
}

// Define the types for sorting and filtering
type SortOrder = 'asc' | 'desc' | null;

interface SortState {
	accessor: string
	order: SortOrder
}

/* * */

const DataTableContext = createContext<DataTableContextState<unknown> | undefined>(undefined);

export function useDataTableContext<T>(): DataTableContextState<T> {
	const context = useContext(DataTableContext);
	if (!context) {
		throw new Error('useDataTableContext must be used within a DataTableContextProvider');
	}
	return context as DataTableContextState<T>;
}

/* * */

export function DataTableContextProvider<T>({ children, columns, initialRecords, searchAccessors }: DataTableProviderProps<T>) {
	//

	//
	// A. Setup variables

	const [sortState, setSortState] = useState<DataTableContextState<T>['filters']['sort_state']>(null);
	const [columnWidths, setColumnWidths] = useState<DataTableContextState<T>['data']['column_widths']>({});

	const { filteredData: searchQueryData, searchQuery, setSearchQuery } = useSearchQuery<T>(initialRecords, { accessors: searchAccessors, debounce: 200 });

	//
	// B. Transform data

	const filteredAndSortedData = useMemo(() => {
		let filteredData: T[] = searchQueryData;

		// Sort Data
		if (sortState) {
			const { accessor, order } = sortState;

			const sortFn = (a: number | string, b: number | string) => {
				if (a < b) return order === 'asc' ? -1 : 1;
				if (a > b) return order === 'asc' ? 1 : -1;
				return 0;
			};

			filteredData = filteredData.sort((a, b) => {
				const aValue = getValueAtPath(a, accessor) ?? '';
				const bValue = getValueAtPath(b, accessor) ?? '';

				// Validate if type is sortable
				if (![typeof aValue, typeof bValue].every(type => type === 'string' || type === 'number')) {
					console.warn(`Sorting key: "${accessor}" is not sortable`);
					return 0;
				}

				const aTimestamp = typeof aValue === 'string' ? tryParseDateToTimestamp(aValue) : null;
				const bTimestamp = typeof bValue === 'string' ? tryParseDateToTimestamp(bValue) : null;

				if (aTimestamp && bTimestamp) {
					return sortFn(aTimestamp, bTimestamp);
				}

				return sortFn(aValue as number | string, bValue as number | string);
			});
		}

		return filteredData;
	}, [initialRecords, sortState, searchQueryData]);

	useEffect(() => {
		// Set initial column widths
		const initialWidths: Record<string, number> = {};
		columns.forEach((column) => {
			if (column.width) {
				initialWidths[String(column.accessor)] = column.width;
			}
		});
		setColumnWidths(initialWidths);
	}, [columns]);

	//
	// C. Handle actions

	const handleSort = useCallback((accessor: string) => {
		if (sortState?.accessor === accessor) {
			const newOrder = sortState.order === 'asc' ? 'desc' : sortState.order === 'desc' ? null : 'asc';
			setSortState(newOrder ? { accessor, order: newOrder } : null);
		}
		else {
			setSortState({ accessor, order: 'asc' });
		}
	}, [sortState]);

	const updateFilterBySearchQuery = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const clearSearchQuery = useCallback(() => {
		setSearchQuery(undefined);
	}, []);

	const handleUpdateColumnWidth = useCallback((column: string, width: number) => {
		setColumnWidths(prev => ({
			...prev,
			[column]: width,
		}));
	}, []);

	//
	// D. Define context value

	const contextValue: DataTableContextState<T> = {
		actions: {
			clearSearchQuery,
			handleSort,
			handleUpdateColumnWidth,
			updateFilterBySearchQuery,
		},
		data: {
			column_widths: columnWidths,
			initial_records: initialRecords,
			records: filteredAndSortedData,
		},
		filters: {
			search_query: searchQuery,
			sort_state: sortState,
		},

	};

	//
	// E. Render components

	return (
		<DataTableContext.Provider value={contextValue}>
			{children}
		</DataTableContext.Provider>
	);

	//
};
