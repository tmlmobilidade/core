'use client';

import { ComponentWrapper, Section, Switch } from '@tmlmobilidade/ui';

export default function SwitchExample() {
	return (
		<ComponentWrapper>
			<Section gap="md">
				<Switch />
				<Switch label="Hello" />
			</Section>
		</ComponentWrapper>
	);
}
