'use client';

/* * */

import { ActionIcon } from '@mantine/core';
import { IconLockFilled, IconLockOpen2 } from '@tabler/icons-react';

/* * */

interface LockButtonProps {
	isLocked: boolean
	onClick: () => void
}

/* * */

export function LockButton({ isLocked, onClick }: LockButtonProps) {
	//

	if (isLocked) {
		return (
			<ActionIcon color="var(--color-status-success-primary)" onClick={onClick} variant="subtle">
				<IconLockFilled />
			</ActionIcon>
		);
	}

	return (
		<ActionIcon color="var(--color-primary)" onClick={onClick} variant="subtle">
			<IconLockOpen2 />
		</ActionIcon>
	);

	//
}
