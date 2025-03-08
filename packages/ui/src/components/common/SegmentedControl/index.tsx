'use client';

import { cn } from '@/lib/utils';
import { SegmentedControl as MantineSegmentedControl, SegmentedControlProps as MantineSegmentedControlProps } from '@mantine/core';

import styles from './styles.module.css';

export interface SegmentedControlProps extends MantineSegmentedControlProps {
	fullWidth?: boolean
}

export default function SegmentedControl({ ...props }: SegmentedControlProps) {
	return <MantineSegmentedControl {...props} className={cn(props.className)} classNames={{ ...styles, ...props.classNames }} style={{ width: props.fullWidth ? '100%' : undefined }} />;
}
