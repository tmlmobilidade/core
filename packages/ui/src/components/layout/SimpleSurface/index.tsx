'use client';

/* * */

import styles from './styles.module.css';

/* * */

interface SurfaceProps {
	children: React.ReactNode
	height?: 'auto' | 'full'
	overflow?: 'auto' | 'hidden' | 'scroll'
	padding?: 'lg' | 'md' | 'sm' | 'xl'
}

export function SimpleSurface({ children, height = 'auto', overflow = 'hidden', padding }: SurfaceProps) {
	return (
		<div className={styles.root} data-height={height} data-overflow={overflow} data-padding={padding}>
			{children}
		</div>
	);
}
