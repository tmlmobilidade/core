'use client';

/* * */

import { Menu } from '@mantine/core';

import styles from './styles.module.css';

/* * */

interface Props {
	label: string
}

/* * */

export function DataTableFilterItem({ label }: Props) {
	return (
		<Menu offset={5} withArrow>
			<Menu.Target>
				<div aria-active={true} className={styles.item}>{label}</div>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Item>
					<div>Example 1</div>
				</Menu.Item>
				<Menu.Item>
					<div>Example 2</div>
				</Menu.Item>
				<Menu.Item>
					<div>Example 3</div>
				</Menu.Item>
			</Menu.Dropdown>
		</Menu>
	);
}
