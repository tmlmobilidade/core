'use client';

import { ComponentWrapper, DeleteActionIcon } from '@tmlmobilidade/ui';

export default function DeleteActionIconExample() {
	return (
		<ComponentWrapper>
			<DeleteActionIcon
				confirmMessage="Are you sure you want to delete this?"
				confirmTitle=""
				onConfirm={() => null}
				showConfirmation={true}
			/>
		</ComponentWrapper>
	);
}
