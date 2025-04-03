'use client';

import { ComponentWrapper, Slider } from '@tmlmobilidade/ui';

export default function SliderExample() {
	return (
		<ComponentWrapper>
			<Slider defaultValue={50} marks={[{ label: '20%', value: 20 }]} />
		</ComponentWrapper>
	);
}
