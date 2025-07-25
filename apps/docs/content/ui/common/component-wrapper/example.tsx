'use client';

import { ComponentWrapper } from '@tmlmobilidade/ui';
import { ReactNode } from 'react';

import styles from './styles.module.css';

interface ComponentWrapperProps {
	children: ReactNode
	className?: string
}

export default function ComponentWrapperExample({ children, className }: ComponentWrapperProps) {
	return (
		<ComponentWrapper>
			<div className={`${styles.container} ${className || ''}`}>
				<div className={styles.background} />
				<div className={styles.content}>
					{children}
				</div>
			</div>
		</ComponentWrapper>
	);
}
