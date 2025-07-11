'use client';

/* * */

import { ActionIcon } from '@mantine/core';
import { IconLockFilled, IconLockOpen2 } from '@tabler/icons-react';

import styles from './styles.module.css';

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
			<ActionIcon classNames={{ root: styles.root }} onClick={onClick}>
				<IconLockFilled />
			</ActionIcon>
		);
	}

	return (
		<ActionIcon classNames={{ root: styles.root }} onClick={onClick}>
			<IconLockOpen2 />
		</ActionIcon>
	);

	//
}
