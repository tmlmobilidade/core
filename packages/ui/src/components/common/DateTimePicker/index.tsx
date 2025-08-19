'use client';

/* * */

import {
	DateTimePicker as MantineDateTimePicker,
	DateTimePickerProps as MantineDateTimePickerProps,
} from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';

import styles from './styles.module.css';
export interface DateTimePickerProps extends MantineDateTimePickerProps {
	/**
	 * Full width of the input.
	 */
	fullWidth?: boolean

	/**
	 * Left section of the input.
	 * @default <IconCalendar size={20} />
	 */
	leftSection?: React.ReactNode
}

export default function DateTimePicker({
	leftSection = <IconCalendar size={20} />,
	...props
}: DateTimePickerProps) {
	return <MantineDateTimePicker classNames={{ ...styles, ...props.classNames }} style={{ width: props.fullWidth ? '100%' : undefined }} {...props} leftSection={leftSection} />;
}
