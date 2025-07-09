/* * */

import { Label } from '@/components/display/Label';
import { PropsWithChildren } from 'react';

import styles from './styles.module.css';

/* * */

interface FiltersBarProps {
	label?: string
}

/* * */

export function FiltersBar({ children, label = 'Filtrar por' }: PropsWithChildren<FiltersBarProps>) {
	return (
		<div className={styles.container}>
			<Label size="sm" caps singleLine>{label}</Label>
			{children}
		</div>
	);
}
