'use client';

/* * */

import TextInput from '@/components/common/TextInput';
import { DataTableTitleProps } from '@/components/datatable/datatable.type';
import { useDataTableContext } from '@/components/datatable/DataTableContext';
import React from 'react';

import styles from './styles.module.css';

/* * */

export function DataTableTitle<T>({ search, title }: DataTableTitleProps<T>) {
	//

	//
	// A. Setup variables

	if (!title && !search) return null;

	const { actions: { updateFilterBySearchQuery }, filters: { searchQuery } } = useDataTableContext<T>();

	//
	// B. Handle actions

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFilterBySearchQuery(event.target.value);
	};

	//
	// C. Render components

	return (
		<div className={styles.root}>
			<div className={styles.title}>{title && title}</div>
			{search && !search.hidden && (
				<div className={styles.filters}>
					<TextInput onChange={handleSearchChange} placeholder={search.placeholder} value={searchQuery} />
				</div>
			)}
		</div>
	);

	//
}
