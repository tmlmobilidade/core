'use client';

import { Button, ComponentWrapper, Section, SegmentedControl } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function SegmentedControlExample() {
	const [value, setValue] = useState('bus');

	return (
		<ComponentWrapper>
			<Section alignItems="center" flexDirection="row" gap="md">
				<SegmentedControl data={['bus', 'train', 'bike']} onChange={value => setValue(value)} value={value} />
				<Button label="Hello!" />
				<SegmentedControl data={['bus', 'train', 'bike']} onChange={value => setValue(value)} value={value} fullWidth />
			</Section>
		</ComponentWrapper>
	);
};
