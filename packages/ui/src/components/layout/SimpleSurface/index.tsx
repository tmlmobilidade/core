'use client';

/* * */

import styles from './styles.module.css';

/* * */

interface SurfaceProps {
	children: React.ReactNode
	padding?: 'lg' | 'md' | 'sm' | 'xl'
}

export function SimpleSurface({ children, padding }: SurfaceProps) {
	return (
		<div className={styles.root} data-padding={padding}>
			{children}
		</div>
	);
}
