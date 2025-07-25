'use client';

import { ComponentWrapper, DeleteButton, Grid, Label } from '@tmlmobilidade/ui';

export default function DeleteButtonExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc" gap="md">
				<div>

					<Label>Cancel Button</Label>
					<DeleteButton
						cancelLabel="Cancel"
						confirmLabel="Delete"
						confirmMessage="This action deletes a resource"
						confirmTitle="Are you sure you want to delete?"
						onCancel={() => { alert('Canceled'); }}
						onDelete={() => { alert('Deleted'); }}
						showConfirmation={true}
					/>
				</div>
				<div>
					<Label>Delete Button</Label>
					<DeleteButton onDelete={() => { alert('Deleted'); }} />
				</div>
			</Grid>

		</ComponentWrapper>
	);
}
