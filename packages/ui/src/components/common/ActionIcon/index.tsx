'use client';

import { cn } from '@/lib/utils';
import { ActionIcon as ActionIconMantine } from '@mantine/core';

import styles from './styles.module.css';

export interface ActionIconProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	disabled?: boolean
	loading?: boolean
	variant: 'active' | 'danger' | 'info' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning'
}

export default function ActionIcon({
	children,
	className,
	disabled = false,
	variant = 'primary',
	...props
}: ActionIconProps) {
	const btnClass = cn(
		className,
		styles.button,
		!disabled && {
			[styles.active]: variant === 'active',
			[styles.danger]: variant === 'danger',
			[styles.info]: variant === 'info',
			[styles.muted]: variant === 'muted',
			[styles.primary]: variant === 'primary',
			[styles.secondary]: variant === 'secondary',
			[styles.success]: variant === 'success',
			[styles.warning]: variant === 'warning',
		},
		disabled && styles.disabled,
	);

	return (
		<ActionIconMantine className={btnClass} classNames={styles} {...props}>
			{children}
		</ActionIconMantine>
	);
}
