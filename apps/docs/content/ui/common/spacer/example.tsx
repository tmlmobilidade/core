'use client';

import { ComponentWrapper, Label, Spacer } from '@tmlmobilidade/ui';

export default function SpacerExample() {
	return (
		<ComponentWrapper>
			<Label>Bus</Label>
			<Spacer />
			<Label>Train</Label>
			<Spacer />
			<Label>Metro</Label>
		</ComponentWrapper>
	);
}
