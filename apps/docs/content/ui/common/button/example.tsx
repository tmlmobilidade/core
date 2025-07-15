'use client';

import { Button, ComponentWrapper, Grid, Label } from '@tmlmobilidade/ui';

export default function ButtonExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc" gap="md">
				<div>

					<Label>Button Default</Label>
					<Button label="Hello!" />
				</div>
				<div>
					<Label>Button Primary</Label>
					<Button label="Hello!" variant="primary" />
				</div>
				<div>
					<Label>Button Secondary</Label>
					<Button label="Hello!" variant="secondary" />
				</div>
				<div>
					<Label>Button Muted</Label>
					<Button label="Hello!" variant="muted" />
				</div>
				<div>
					<Label>Button Danger</Label>
					<Button label="Hello!" variant="danger" />
				</div>
			</Grid>

		</ComponentWrapper>
	);
}
