/* * */

import { DateTimePicker } from '@/components/dates/DateTimePicker';
import { FilterWrapper } from '@/components/filters/FilterWrapper';
import { useMemo } from 'react';

/* * */

interface FilterTypeDateRangeOption {
	checked?: boolean
	disabled?: boolean
	label: string
	value: string
}

interface FilterTypeDateRangeProps {
	active?: boolean
	disabled?: boolean
	label: string
	onChange?: (values: string[]) => void
	options?: FilterTypeDateRangeOption[]
	type?: 'checkboxes'
	withToggleAll?: boolean
}

/* * */

export function FilterTypeDateRange({ active, disabled, label, onChange, options, withToggleAll }: FilterTypeDateRangeProps) {
	//

	//
	// A. Transform data

	const isDisabled = useMemo(() => {
		// If options are not provided or are empty,
		// the menu should be disabled.
		return !options?.length || disabled;
	}, [options]);

	const checkedOptionValues = useMemo(() => {
		// Skip if options are not provided or are empty.
		if (!options?.length) return;
		// Parse options to the
		return options
			.filter(option => option.checked)
			.map(option => option.value);
	}, [options]);

	const toggleAllActive = useMemo(() => {
		// The toggleAllActive state should be set to true
		// if all options are checked, otherwise it should be false.
		if (!options?.length) return;
		return options.every(option => option.checked);
	}, [options]);

	//
	// B. Handle actions

	const handleToggleAll = () => {
		// Skip if no onChange callback is provided.
		if (!onChange || !options) return;
		// If the toggle is enabled, then toggle OFF
		// all options by setting a new empty array.
		if (toggleAllActive) onChange([]);
		// If the toggle is disabled, then toggle ON
		// all options by setting the values of all options.
		else onChange(options.map(option => option.value));
	};

	//
	// C. Render components

	return (
		<FilterWrapper
			active={active}
			disabled={isDisabled}
			label={label}
		>
			<DateTimePicker
				onChange={handleChange}
				placeholder="end"
				value={valueAsString}
				clearable
			/>
		</FilterWrapper>
	);

	//
};
