'use client';

/* * */

import { cn } from '@/lib/utils';

import styles from './styles.module.css';

/* * */

interface Props extends React.HTMLAttributes<HTMLDivElement> {
	columns?: 'a' | 'aab' | 'ab' | 'abb' | 'abc' | 'abcd'
	gap?: 'lg' | 'md' | 'none' | 'sm' | 'xl' | 'xs'
	hAlign?: 'center' | 'end' | 'start'
	vAlign?: 'center' | 'end' | 'start'
}

/* * */

export default function Grid({ children, className, columns = 'a', gap = 'none', hAlign = 'start', vAlign = 'start', ...props }: Props) {
	return (
		<div className={cn(styles.container, styles[columns], styles[`hAlign${hAlign}`], styles[`vAlign${vAlign}`], styles[`gap${gap}`], className)} {...props}>
			{children}
		</div>
	);
}
