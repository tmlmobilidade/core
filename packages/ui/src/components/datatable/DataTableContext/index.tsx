'use client';

import { useSearchQuery } from '@/hooks/use-search-query';
import { tryParseDateToTimestamp } from '@/lib/utils';
import { getValueAtPath } from '@/lib/utils';
import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

import { DataTableSearchProps } from '../datatable.type';

// Define the context type
interface DataTableContextType<T> {
	actions: {
		clearSearchQuery: () => void
		handleSort: (accessor: string) => void
		updateFilterBySearchQuery: (query: string) => void
	}
	data: {
		initialRecords: T[]
		records: T[]
	}
	filters: {
		searchQuery?: string
		sortState: null | SortState
	}
}

// Define the props for the provider component
interface DataTableProviderProps<T> {
	children: ReactNode
	initialRecords: T[]
	searchAccessors: DataTableSearchProps<T>['accessors']
}

// Define the types for sorting and filtering
type SortOrder = 'asc' | 'desc' | null;

interface SortState {
	accessor: string
	order: SortOrder
}

const DataTableContext = createContext<DataTableContextType<unknown> | undefined>(undefined);

// Provider component
export function DataTableProvider<T>({ children, initialRecords, searchAccessors }: DataTableProviderProps<T>) {
	//
	// A. Setup Variables
	const [sortState, setSortState] = useState<DataTableContextType<T>['filters']['sortState']>(null);
	const { filteredData: searchQueryData, searchQuery, setSearchQuery } = useSearchQuery<T>(initialRecords, {
		accessors: searchAccessors,
		debounce: 200,
	});
	//
	// B. Transform Data

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

	//
	// C. Handle Actions
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

	//
	// D. Define context value
	const contextValue: DataTableContextType<T> = {
		actions: {
			clearSearchQuery,
			handleSort,
			updateFilterBySearchQuery,
		},
		data: {
			initialRecords,
			records: filteredAndSortedData,
		},
		filters: {
			searchQuery,
			sortState,
		},

	};

	//
	// E. Render Components
	return (
		<DataTableContext.Provider value={contextValue}>
			{children}
		</DataTableContext.Provider>
	);
};

// Custom hook for consuming the context
export function useDataTableContext<T>(): DataTableContextType<T> {
	const context = useContext(DataTableContext);
	if (!context) {
		throw new Error('useDataTableContext must be used within a DataTableProvider');
	}
	return context as DataTableContextType<T>;
};
