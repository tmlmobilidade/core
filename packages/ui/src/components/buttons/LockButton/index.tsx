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
			<ActionIcon color="green" onClick={onClick} variant="light">
				<IconLockFilled />
			</ActionIcon>
		);
	}

	return (
		<ActionIcon color="red" onClick={onClick} variant="filled">
			<IconLockOpen2 />
		</ActionIcon>
	);

	//
}
