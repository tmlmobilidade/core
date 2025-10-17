'use client';

import { ComponentWrapper, FilterTypeList } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function FilterMenuExample() {
	const [selectedValues, setSelectedValues] = useState<string[]>(['in-progress']);

	const options = [
		{ label: 'Done', value: 'Done' },
		{ label: 'In Progress', value: 'in-progress' },
	];

	const enhancedOptions = options.map(option => ({
		...option,
		checked: selectedValues.includes(option.value),
	}));

	return (
		<ComponentWrapper>
			<FilterTypeList
				label="Status"
				onChange={setSelectedValues}
				options={enhancedOptions}
				withToggleAll
			/>
		</ComponentWrapper>
	);
}
