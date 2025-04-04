/* * */

import { Loader } from '@/components/common';

import styles from './styles.module.css';

/* * */

interface LoadingOverlayProps {
	fullscreen?: boolean
	size?: 'lg' | 'md' | 'sm' | 'xl'
}

export function LoadingOverlay({ fullscreen, size = 'md' }: LoadingOverlayProps) {
	return (
		<div className={styles.root} data-fullscreen={fullscreen}>
			<Loader size={size} />
		</div>
	);
}
