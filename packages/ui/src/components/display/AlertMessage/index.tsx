/* * */

import { IconAlertCircle } from '@tabler/icons-react';

import styles from './styles.module.css';

/* * */

interface AlertMessageProps {
	icon?: React.ReactNode
	title: string
	variant?: 'danger' | 'disabled' | 'muted' | 'primary' | 'secondary'
}

/* * */

export function AlertMessage({ icon, title, variant = 'primary' }: AlertMessageProps) {
	return (
		<div className={styles.root} data-variant={variant}>
			{icon ?? <IconAlertCircle />}
			<p className={styles.title}>{title}</p>
		</div>
	);
}
