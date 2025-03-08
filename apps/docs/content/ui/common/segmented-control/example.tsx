'use client';

import { ComponentWrapper, SegmentedControl } from '@tmlmobilidade/ui';

export default function SegmentedControlExample() {
	return (
		<ComponentWrapper>
			<SegmentedControl data={['Option 1', 'Option 2', 'Option 3']} />
		</ComponentWrapper>
	);
}
