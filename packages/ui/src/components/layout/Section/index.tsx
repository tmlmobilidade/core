/* * */

import styles from './styles.module.css';

/* * */

interface SectionProps {
	alignItems?: 'center' | 'flex-end' | 'flex-start'
	children: React.ReactNode
	flexDirection?: 'column' | 'row'
	flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse'
	gap?: 'lg' | 'md' | 'sm' | 'xs' | null
	justifyContent?: 'center' | 'flex-end' | 'flex-start' | 'space-between'
	padding?: 'lg' | 'md' | 'none' | 'sm' | null
}

/* * */

export function Section({ alignItems = 'flex-start', children, flexDirection = 'column', flexWrap = 'nowrap', gap, justifyContent = 'flex-start', padding = 'md' }: SectionProps) {
	return (
		<div
			className={styles.root}
			data-align-items={alignItems}
			data-flex-direction={flexDirection}
			data-flex-wrap={flexWrap}
			data-gap={gap}
			data-justify-content={justifyContent}
			data-padding={padding}
		>
			{children}
		</div>
	);
}
