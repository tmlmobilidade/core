'use client';

import { Menu } from '@mantine/core';

import styles from './styles.module.css';

export default function DataTableFilter() {
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

function DataTableFilterItem({ label }: { label: string }) {
	return (
		<Menu offset={5} withArrow>
			<Menu.Target>
				<div aria-active={true} className={styles.item}>{label}</div>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item>
					<div>Item oiwjefoj  oqijwe oiqwejj qowiejojwoeinmo oiwje</div>
				</Menu.Item>
				<Menu.Item>
					<div>Item oiwjefoj  oqijwe oiqwejj qowiejojwoeinmo oiwje</div>
				</Menu.Item>
				<Menu.Item>
					<div>Item oiwjefoj  oqijwe oiqwejj qowiejojwoeinmo oiwje</div>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
