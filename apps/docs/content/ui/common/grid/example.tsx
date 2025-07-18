'use client';

import { ComponentWrapper, Grid } from '@tmlmobilidade/ui';

export default function GridExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abcd" gap="xs" hAlign="center">Label 1</Grid>
			<Grid columns="a" gap="xs" hAlign="start">Label 2</Grid>
		</ComponentWrapper>
	);
}
