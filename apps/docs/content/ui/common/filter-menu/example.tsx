'use client';

import { ComponentWrapper, FilterMenu } from '@tmlmobilidade/ui';
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
			<FilterMenu
				label="Status"
				onChange={setSelectedValues}
				options={enhancedOptions}
				withToggleAll
			/>
		</ComponentWrapper>
	);
}
