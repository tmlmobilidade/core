'use client';

/* * */

import { useMeContext } from '@/contexts';
import { ActionIcon, Menu } from '@mantine/core';
import { IconNotification } from '@tabler/icons-react';

/* * */

export function AppWrapperNotificationCentral() {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	//
	// B. Render components

	return (
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%">
			<Menu.Target>
				<ActionIcon color="gray" variant="subtle">
					<IconNotification size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<>
					<p>teste</p>
					<p>teste2</p>
					<p>teste3</p>
				</>
			</Menu.Dropdown>
		</Menu>
	);

	//
}
