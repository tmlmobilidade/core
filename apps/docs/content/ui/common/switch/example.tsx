'use client';

import { ComponentWrapper, Section, Switch } from '@tmlmobilidade/ui';

export default function SwitchExample() {
	return (
		<ComponentWrapper>
			<Section gap="md">
				<Switch label="Hello" />
				<Switch label="Bye" />
			</Section>
		</ComponentWrapper>
	);
}
