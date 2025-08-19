'use client';

import { ComponentWrapper, Label, Pane, PanesManager, Spacer, Text } from '@tmlmobilidade/ui';

export default function PaneExample() {
	return (
		<ComponentWrapper>
			<PanesManager
				id="test"
				panes={[
					<Pane header={[
						<>
							<Label size="lg" caps>Header</Label>
							<Spacer />
							<Label size="lg" caps>Aside</Label>
						</>,
					]}
					>
						<Text>Content</Text>
						<Text>Content</Text>
						<Text>Content</Text>
						<Text>Content</Text>
					</Pane>,
					<Pane header={[
						<>
							<Label size="lg" caps>Header</Label>
							<Spacer />
							<Label size="lg" caps>Aside</Label>
						</>,
					]}
					>
						<Text>Content</Text>
						<Text>Content</Text>
						<Text>Content</Text>
						<Text>Content</Text>
					</Pane>,
				]}
			/>
		</ComponentWrapper>
	);
}
