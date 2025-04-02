'use client';

import { Button, ComponentWrapper, Section, Spacer } from '@tmlmobilidade/ui';

export default function ButtonExample() {
	return (
		<ComponentWrapper>
			<Section flexDirection="row" gap="md">
				<Button label="Hello!" />
				<Spacer />
				<Button label="Hello!" />
			</Section>
		</ComponentWrapper>
	);
}
