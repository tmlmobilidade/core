'use client';

/* * */

import { ActionIcon } from '@mantine/core';
import { IconLogin, IconSettings } from '@tabler/icons-react';

import { Menu } from '../../common';

/* * */

// interface AppOptionsProps {
// 	apiUrl: string
// }

export function AppWrapperOptions() {
	//

	//
	// A. Setup variables

	//
	// B. Handle actions

	//
	// C. Render components

	return (
		<Menu offset={15} position="bottom-end" shadow="lg">
			<Menu.Target>
				<ActionIcon color="gray" variant="muted">
					<IconSettings size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<Menu.Divider />
				<Menu.Item color="var(--color-status-danger-primary)" href="/logout" leftSection={<IconLogin size={20} />}>
					Logout
				</Menu.Item>
				<Menu.Divider />
				{/* <Menu.Label>Version {pjson.version}</Menu.Label> */}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
