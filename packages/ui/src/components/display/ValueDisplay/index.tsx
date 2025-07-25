/* * */

import styles from './styles.module.css';

/* * */

interface ValueDisplayProps {
	label: string
	raised?: boolean
	value: string
}

/* * */

export function ValueDisplay({ label, raised, value }: ValueDisplayProps) {
	return (
		<div className={styles.container} data-raised={raised}>
			<p className={styles.label}>{label}</p>
			<p className={styles.value}>{value}</p>
		</div>
	);
}
