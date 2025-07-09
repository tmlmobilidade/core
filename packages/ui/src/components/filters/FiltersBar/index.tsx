/* * */

import { Label } from '@/components/common';
import { PropsWithChildren } from 'react';

import styles from './styles.module.css';

/* * */

interface FiltersBarProps {
	label?: string
}

/* * */

export function FiltersBar({ children, label = 'Filtrar por' }: PropsWithChildren<FiltersBarProps>) {
	return (
		<div className={styles.root}>
			<Label size="sm" caps singleLine>{label}</Label>
			{children}
		</div>
	);
}
