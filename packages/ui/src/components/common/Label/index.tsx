'use client';

/* * */

import React from 'react';

import styles from './styles.module.css';

/* * */

export interface LabelProps {
	caps?: boolean
	children?: React.ReactNode
	singleLine?: boolean
	size?: 'lg' | 'md' | 'sm'
}

/* * */

export function Label({ caps = false, children, singleLine = false, size = 'md' }: LabelProps) {
	return (
		<p className={styles.label} data-caps={caps} data-single-line={singleLine} data-size={size}>
			{children}
		</p>
	);
}
