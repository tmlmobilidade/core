/* * */

import styles from './styles.module.css';

/* * */

interface SectionProps {
	alignItems?: 'center' | 'flex-end' | 'flex-start'
	children: React.ReactNode
	flexDirection?: 'column' | 'row'
	gap?: 'lg' | 'md' | 'sm' | null
	justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between'
	padding?: 'lg' | 'md' | 'sm' | null
}

/* * */

export default function Section({ alignItems = 'flex-start', children, flexDirection = 'column', gap, justifyContent = 'flex-start', padding = 'md' }: SectionProps) {
	return (
		<div
			className={styles.root}
			data-align-items={alignItems}
			data-flex-direction={flexDirection}
			data-gap={gap}
			data-justify-content={justifyContent}
			data-padding={padding}
		>
			{children}
		</div>
	);
}
