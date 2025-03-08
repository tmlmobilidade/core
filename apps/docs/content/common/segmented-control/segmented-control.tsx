'use client';

import { ComponentWrapper, SegmentedControl } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function SegmentedControlExample() {
	const [value, setValue] = useState('Bus 🚌');

	return (
		<ComponentWrapper>
			<SegmentedControl className="flex-1" data={['Bus 🚌', 'Train 🚂', 'Bike 🚲']} onChange={value => setValue(value)} value={value} />
		</ComponentWrapper>
	);
};
