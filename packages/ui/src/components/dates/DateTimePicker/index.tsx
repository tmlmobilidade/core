'use client';

/* * */

import { DateTimePicker as MantineDateTimePicker } from '@mantine/dates';
import { IconCalendar } from '@tabler/icons-react';
import { UnixTimestamp } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/utils';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export interface DateTimePickerProps {

	/**
	 * Full width of the input.
	 */
	fullWidth?: boolean

	/**
	 * Left section of the input.
	 * @default <IconCalendar size={20} />
	 */
	leftSection?: React.ReactNode

	/**
	 * Called when the value changes.
	 * @param value The new value.
	 */
	onChange?: (value: null | UnixTimestamp) => void

	/**
	 * Placeholder text for the input.
	 */
	placeholder?: string

	/**
	 * The current value of the input.
	 */
	value?: null | UnixTimestamp

}

/* * */

export function DateTimePicker({ fullWidth, leftSection = <IconCalendar size={20} />, onChange, placeholder, value }: DateTimePickerProps) {
	//

	//
	// A. Transform data

	const valueAsString = useMemo(() => {
		if (!value) return null;
		return Dates
			.fromUnixTimestamp(value)
			.setZone('Europe/Lisbon', 'offset_only')
			.toFormat('yyyy-LL-dd HH:mm:ss');
	}, [value]);

	//
	// B. Handle actions

	const handleChange = (value: null | string) => {
		if (!onChange) return;
		if (!value) return onChange(null);
		const parsedValue = Dates
			.fromFormat(value, 'yyyy-LL-dd HH:mm:ss', 'Europe/Lisbon')
			.unix_timestamp;
		onChange(parsedValue);
	};

	//
	// C. Render components

	return (
		<MantineDateTimePicker
			classNames={styles}
			leftSection={leftSection}
			onChange={handleChange}
			placeholder={placeholder}
			style={{ width: fullWidth ? '100%' : undefined }}
			value={valueAsString}
			valueFormat="YYYY-MM-DD HH:mm"
			clearable
		/>
	);

	//
}
