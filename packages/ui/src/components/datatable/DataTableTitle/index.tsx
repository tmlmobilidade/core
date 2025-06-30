'use client';

/* * */

import { TextInput } from '@/components/common/TextInput';
import { DataTableSearchProps } from '@/components/datatable/datatable.type';
import { useDataTableContext } from '@/components/datatable/DataTableContext';
import React from 'react';

import styles from './styles.module.css';

/* * */

interface Props<T> {

	/**
	 * The search configuration for the table.
	 */
	search?: DataTableSearchProps<T>

	/**
	 * The title of the table.
	 */
	title?: string

}

/* * */

export function DataTableTitle<T>({ search, title }: Props<T>) {
	//

	//
	// A. Setup variables

	if (!title && !search) return null;

	const dataTableContext = useDataTableContext<T>();

	//
	// B. Handle actions

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dataTableContext.actions.updateFilterBySearchQuery(event.target.value);
	};

	//
	// C. Render components

	return (
		<div className={styles.root}>
			<div className={styles.title}>{title && title}</div>
			{search && !search.hidden && (
				<div className={styles.filters}>
					<TextInput onChange={handleSearchChange} placeholder={search.placeholder} value={dataTableContext.filters.search_query} />
				</div>
			)}
		</div>
	);

	//
}
