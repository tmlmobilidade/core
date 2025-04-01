/* * */

import styles from './styles.module.css';

/* * */

interface SpacerProps {
	orientation?: 'horizontal' | 'vertical'
	size?: 'full' | 'lg' | 'md' | 'sm'
}

/* * */

export function Spacer({ orientation = 'horizontal', size = 'full' }: SpacerProps) {
	return (
		<div
			className={styles.container}
			data-orientation={orientation}
			data-size={size}
		/>
	);
}
