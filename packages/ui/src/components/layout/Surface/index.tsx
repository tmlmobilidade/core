/* * */

import styles from './styles.module.css';

/* * */

interface SurfaceProps {
	children: React.ReactNode
	height?: 'auto' | 'full'
	overflow?: 'auto' | 'hidden' | 'scroll'
}

export function Surface({ children, height = 'auto', overflow = 'hidden' }: SurfaceProps) {
	return (
		<div className={styles.root} data-height={height} data-overflow={overflow}>
			{children}
		</div>
	);
}
