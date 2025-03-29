'use client';

/* * */

import styles from './styles.module.css';

/* * */

interface SurfaceProps {
	children: React.ReactNode
	overflow?: 'auto' | 'hidden' | 'scroll'
	padding?: 'lg' | 'md' | 'sm' | 'xl'
}

export function SimpleSurface({ children, overflow = 'hidden', padding }: SurfaceProps) {
	return (
		<div className={styles.root} data-overflow={overflow} data-padding={padding}>
			{children}
		</div>
	);
}
