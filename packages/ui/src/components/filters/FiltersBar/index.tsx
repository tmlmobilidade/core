/* * */

import { Label } from '@/components/display/Label';
import { type PropsWithChildren } from 'react';

import styles from './styles.module.css';

/* * */

interface FiltersBarProps {
	label?: string
}

/* * */

export function FiltersBar({ children, label = 'Filtrar por' }: PropsWithChildren<FiltersBarProps>) {
	return (
		<div className={styles.toolbar}>
			<Label size="sm" caps singleLine>{label}</Label>
			{children}
		</div>
	);
}
