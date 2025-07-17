'use client';

import { ComponentWrapper, MultiSelect } from '@tmlmobilidade/ui';
import { useState } from 'react';

const sampleData = [
	{ label: 'Bus', value: 'bus' },
	{ label: 'Train', value: 'train' },
	{ label: 'Metro', value: 'metro' },
	{ label: 'Ship', value: 'ship' },
];

export default function MultiSelectExample() {
	const [selected, setSelected] = useState<string[]>([]);

	return (
		<ComponentWrapper>
			<MultiSelect
				data={sampleData}
				description="Pick transportation"
				label="Transportation"
				onChange={setSelected}
				selected={selected}
			/>
		</ComponentWrapper>
	);
}
