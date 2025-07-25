'use client';

import { ComponentWrapper, Divider, Grid, Label } from '@tmlmobilidade/ui';

export default function DividerExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc" gap="lg">
				<div>
					<Label>Horizontal</Label>
					<Divider orientation="horizontal" />
				</div>
			</Grid>

			<Grid columns="abc" gap="lg">
				<div>
					<Label>Vertical</Label>
					<Divider orientation="vertical" />
				</div>
			</Grid>

		</ComponentWrapper>

	);
}
