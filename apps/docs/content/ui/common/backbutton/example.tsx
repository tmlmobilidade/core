'use client';

import { BackButton, ComponentWrapper, Grid, Label } from '@tmlmobilidade/ui';

export default function BackButtonExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc" gap="md">
				<div>

					<Label>Back Button</Label>
					<BackButton type="back" />
				</div>
				<div>
					<Label>Close Button</Label>
					<BackButton type="close" />
				</div>
			</Grid>

		</ComponentWrapper>
	);
}
