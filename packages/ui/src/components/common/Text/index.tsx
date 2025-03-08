'use client';

/* * */

import {
	Text as MantineText,
	TextProps as MantineTextProps,
} from '@mantine/core';

import styles from './styles.module.css';

export interface TextProps extends MantineTextProps {
	children: React.ReactNode
	lineHeight?: '2xl' | 'base' | 'lg' | 'none' | 'sm' | 'xl' | 'xs'
	size?: '2xl' | 'base' | 'lg' | 'sm' | 'xl' | 'xs'
	weight?: 'bold' | 'extra-bold' | 'medium' | 'semibold'
}

export default function Text({ children, lineHeight = 'base', size = 'base', weight = 'medium', ...props }: TextProps) {
	return (
		<MantineText
			className={styles.root}
			style={{
				fontSize: `var(--font-size-${size})`,
				fontWeight: `var(--font-weight-${weight})`,
				lineHeight: lineHeight === 'none' ? 0 : `var(--font-line-height-${lineHeight})`,
			}}
			{...props}
		>
			{children}
		</MantineText>
	);
}
