'use client';

/* * */

import { SegmentedControl as MantineSegmentedControl, SegmentedControlProps as MantineSegmentedControlProps } from '@mantine/core';

/* * */

export interface SegmentedControlProps extends MantineSegmentedControlProps {
	fullWidth?: boolean
}

/* * */

export default function SegmentedControl({ fullWidth, ...props }: SegmentedControlProps) {
	return (
		<MantineSegmentedControl
			style={{ width: fullWidth ? '100%' : undefined }}
			{...props}
		/>
	);
}
