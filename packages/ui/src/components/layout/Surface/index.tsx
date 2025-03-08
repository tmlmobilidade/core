'use client';

/* * */

import { cn } from '@/lib/utils';

import styles from './styles.module.css';

interface SurfaceClassNames {
	divider?: string
	root?: string
	surface?: string
}

interface SurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
	alignItems?: 'center' | 'end' | 'start'
	borderRadius?: 'lg' | 'md' | 'none' | 'sm' | 'xl'
	children: React.ReactNode
	classNames?: SurfaceClassNames
	divider?: boolean
	flexDirection?: 'column' | 'row'
	gap?: 'lg' | 'md' | 'none' | 'sm' | 'xl'
	justifyContent?: 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly' | 'start'
	padding?: 'lg' | 'md' | 'none' | 'sm' | 'xl'
	variant?: 'default' | 'primary' | 'secondary'
}

export default function Surface({
	alignItems = 'start',
	borderRadius = 'none',
	children,
	classNames,
	divider = false,
	flexDirection = 'column',
	gap = 'none',
	justifyContent = 'start',
	padding = 'none',
	variant = 'default',
	...props
}: SurfaceProps) {
	const rootClass = cn(styles.root, classNames?.root);
	const dividerClass = cn(
		styles.divider,
		!divider && 'hidden',
		styles[`borderRadius-${borderRadius}`],
		classNames?.divider,
	);
	const surfaceClass = cn(
		styles.surface,
		styles[`borderRadius-${borderRadius}`],
		styles[`padding-${padding}`],
		styles[variant],
		styles[`gap-${gap}`],
		classNames?.surface,
	);

	return (
		<div className={rootClass} {...props}>
			<div className={surfaceClass} style={{ alignItems, flexDirection, justifyContent }}>
				{children}
			</div>
			{divider && <div className={dividerClass} />}
		</div>
	);
}
