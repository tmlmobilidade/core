'use client';

import { ComponentWrapper, Label, Pane, Spacer, Text } from '@tmlmobilidade/ui';

export default function PaneExample() {
	return (
		<ComponentWrapper>
			<Pane header={[
				<>
					<Label size="lg" caps singleLine>App Title</Label>
					<Spacer />
					<Label size="lg" caps singleLine>Aside</Label>
				</>,
				<>
					<Label size="md" caps singleLine>Secondary Row</Label>
					<Spacer />
					<Label size="md" caps singleLine>Aside Secondary</Label>
				</>,
			]}
			>
				<Text>Content</Text>
				<Text>Content</Text>
				<Text>Content</Text>
				<Text>Content</Text>
			</Pane>
		</ComponentWrapper>
	);
}
