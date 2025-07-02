'use client';

/* * */

import { type ReactNode } from 'react';

import styles from './styles.module.css';

/* * */

export interface LabelProps {
	caps?: boolean
	children?: ReactNode
	overflow?: boolean
	singleLine?: boolean
	size?: 'lg' | 'md' | 'sm'
}

/* * */

export function Label({ caps = false, children, overflow = false, singleLine = false, size = 'md' }: LabelProps) {
	return (
		<p className={styles.label} data-caps={caps} data-overflow={overflow} data-single-line={singleLine} data-size={size}>
			{children}
		</p>
	);
}
