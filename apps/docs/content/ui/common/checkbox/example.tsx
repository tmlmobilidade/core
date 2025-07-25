'use client';

import { Checkbox, ComponentWrapper, Grid } from '@tmlmobilidade/ui';

export default function CheckboxExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc">
				<Checkbox
					label="option 1"
				/>
				<Checkbox
					label="option 2"
				/>
				<Checkbox
					label="option 3"
				/>
			</Grid>
		</ComponentWrapper>
	);
}
