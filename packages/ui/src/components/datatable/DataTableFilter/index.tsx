'use client';

/* * */

import { DataTableFilterItem } from '@/components/datatable/DataTableFilterItem';

import styles from './styles.module.css';

/* * */

export function DataTableFilter() {
	return (
		<div className={styles.root}>
			<div className={styles.label}>Filtrar Por:</div>
			<div className={styles.itemsWrapper}>
				<DataTableFilterItem label="Linha" />
				<DataTableFilterItem label="Operador" />
				<DataTableFilterItem label="Tipo" />
				<DataTableFilterItem label="Status" />
				<DataTableFilterItem label="Data" />
				<DataTableFilterItem label="Partida" />
				<DataTableFilterItem label="Chegada" />
			</div>
		</div>
	);
}
