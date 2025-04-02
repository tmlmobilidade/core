'use client';

import { ComponentWrapper, Section, SegmentedControl } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function SegmentedControlExample() {
	const [value, setValue] = useState('Bus 🚌');

	return (
		<ComponentWrapper>
			<Section flexDirection="row" gap="md">
				<SegmentedControl data={['Bus 🚌', 'Train 🚂', 'Bike 🚲']} onChange={value => setValue(value)} value={value} />
				<SegmentedControl data={['Bus 🚌', 'Train 🚂', 'Bike 🚲']} onChange={value => setValue(value)} value={value} fullWidth />
			</Section>
		</ComponentWrapper>
	);
};
