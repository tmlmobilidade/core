/* * */

import styles from './styles.module.css';

/* * */

interface IndicatorProps {
	variant?: 'danger' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning'
}

/* * */

export function Indicator({ variant = 'primary' }: IndicatorProps) {
	return (
		<div className={styles.root} data-variant={variant}>
			<div className={styles.indicator} />
		</div>
	);
}
