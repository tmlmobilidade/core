'use client';

/* * */

import { SimpleSurface } from '@/components/layout/SimpleSurface';

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	header?: React.ReactNode
}

/* * */

export function Pane({ children, header }: Props) {
	return (
		<SimpleSurface>
			{header && <div className={styles.header}>{header}</div>}
			{children && <div className={styles.children}>{children}</div>}
		</SimpleSurface>
	);
}
