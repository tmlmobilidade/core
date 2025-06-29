'use client';

/* * */

import { ActionIcon } from '@mantine/core';
import { IconChevronLeft, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

/* * */

interface BackButtonProps {
	href?: string
	type?: 'back' | 'close'
}

/* * */

export function BackButton({ href, type = 'back' }: BackButtonProps) {
	//

	//
	// A. Setup variables

	const router = useRouter();

	//
	// B. Handle actions

	const handleClick = () => {
		if (href) router.replace(href);
		else router.back();
	};

	//
	// C. Render components

	return (
		<ActionIcon onClick={handleClick} variant="muted">
			{type === 'back' && <IconChevronLeft />}
			{type === 'close' && <IconX />}
		</ActionIcon>
	);

	//
}
