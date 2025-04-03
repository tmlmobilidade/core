'use client';

import { Button, ComponentWrapper, Section, ThemeSwitcher } from '@tmlmobilidade/ui';

export default function ThemeSwitcherExample() {
	return (
		<ComponentWrapper>
			<Section gap="md">
				<ThemeSwitcher />
				<Button label="Hello" />
			</Section>
		</ComponentWrapper>
	);
}
