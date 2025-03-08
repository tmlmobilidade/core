'use client';

/* * */

import { cn } from '@/lib/utils';
import { Badge as MantineBadge, BadgeProps as MantineBadgeProps } from '@mantine/core';
import React from 'react';

import styles from './styles.module.css';

/* * */

export interface BadgeProps extends MantineBadgeProps {
	children?: React.ReactNode
	disabled?: boolean
	filled?: boolean
	fullWidth?: boolean
	icon?: React.ReactNode
	size?: 'lg' | 'md' | 'sm' | 'xl' | 'xs'
	type?: 'pill' | 'tag'
	variant?: 'active' | 'danger' | 'disabled' | 'info' | 'muted' | 'primary' | 'secondary' | 'success' | 'warning'
}

/* * */

export default function Badge({
	children,
	className,
	disabled = false,
	filled = false,
	fullWidth = false,
	icon,
	size = 'md',
	type = 'tag',
	variant = 'primary',
	...props
}: BadgeProps) {
	//

	const btnClass = cn(
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
		type === 'pill' && styles.pill,
		type === 'tag' && styles.tag,
		fullWidth && styles.fullWidth,
		styles[`font${size}`],
		className,
	);
	return (
		<MantineBadge className={btnClass} data-active={filled} leftSection={icon} {...props}>
			{children}
		</MantineBadge>
	);

	//
}
