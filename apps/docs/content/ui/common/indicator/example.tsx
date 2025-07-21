'use client';

import { ComponentWrapper, Grid, Indicator, Label } from '@tmlmobilidade/ui';

export default function IndicatorExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc" gap="md">
				<div>
					<Label>Danger Indicator</Label>
					<Indicator variant="danger" />
				</div>

				<div>
					<Label>Muted Indicator</Label>
					<Indicator variant="muted" />
				</div>

				<div>
					<Label>Primary Indicator</Label>
					<Indicator variant="primary" />
				</div>

				<div>
					<Label>Secondary Indicator</Label>
					<Indicator variant="secondary" />
				</div>

				<div>
					<Label>Success Indicator</Label>
					<Indicator variant="success" />
				</div>

				<div>
					<Label>Warning Indicator</Label>
					<Indicator variant="warning" />
				</div>
			</Grid>

		</ComponentWrapper>
	);
}
