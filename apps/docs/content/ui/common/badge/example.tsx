'use client';

import { Badge, ComponentWrapper, Grid, Label } from '@tmlmobilidade/ui';

export default function BadgeExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc">
				<div>
					<Label> Active </Label>
					<Badge type="pill" variant="active" />
				</div>

				<div>
					<Label> Danger </Label>
					<Badge variant="danger" />
				</div>

				<div>
					<Label> Disabled </Label>
					<Badge type="pill" variant="disabled" />
				</div>

				<div>
					<Label> Info </Label>
					<Badge variant="info" />
				</div>

				<div>
					<Label> Muted </Label>
					<Badge type="pill" variant="muted" />
				</div>

				<div>
					<Label> Primary </Label>
					<Badge variant="primary" />
				</div>

				<div>
					<Label> Secondary </Label>
					<Badge type="pill" variant="secondary" />
				</div>

				<div>
					<Label> Success </Label>
					<Badge variant="success" />
				</div>

				<div>
					<Label> Warning </Label>
					<Badge type="pill" variant="warning" />
				</div>

			</Grid>

		</ComponentWrapper>
	);
}
