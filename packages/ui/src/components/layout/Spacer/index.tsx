'use client';

/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	orientation: 'horizontal' | 'vertical'
	size: 'full' | 'lg' | 'md' | 'sm'
}

/* * */

export function Spacer({ orientation, size }: Props) {
	return (
		<div
			className={styles.container}
			data-orientation={orientation}
			data-size={size}
		/>
	);
}
