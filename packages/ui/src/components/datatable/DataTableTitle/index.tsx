'use client';

import React from 'react';

import TextInput from '../../common/TextInput';
import { DataTableTitleProps } from '../datatable.type';
import { useDataTableContext } from '../DataTableContext';
import styles from './styles.module.css';

export default function DataTableTitle<T>({ search, title }: DataTableTitleProps<T>) {
	//
	// A. Setup Variables
	if (!title && !search) return null;

	const { actions: { updateFilterBySearchQuery }, filters: { searchQuery } } = useDataTableContext<T>();

	//
	// B. Handle Actions
	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		updateFilterBySearchQuery(event.target.value);
	};

	//
	// C. Render Components
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
}
