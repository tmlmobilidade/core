'use client';

/* * */

import { cn } from '@/lib/utils';

import styles from './styles.module.css';

interface SpacerProps {
	className?: string
	orientation: 'horizontal' | 'vertical'
	size: '2xl' | '3xl' | '4xl' | 'lg' | 'md' | 'sm' | 'xl' | 'xs'
}

export default function Spacer({ className, orientation, size }: SpacerProps) {
	const sizeClass = `size${size}`;
	const orientationClass = `orientation${orientation}`;

	return (
		<div
			className={cn(
				styles[sizeClass],
				styles[orientationClass],
				className,
			)}
			style={{
				minHeight: orientation === 'horizontal' ? '100%' : undefined,
			}}
		/>
	);
}
