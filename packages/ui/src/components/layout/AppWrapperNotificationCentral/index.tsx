'use client';

/* * */

import { AppWrapperNotificationCentralItem } from '@/components/layout/AppWrapperNotificationCentralItem';
import { useNotificationsContext } from '@/contexts';
import { ActionIcon, Menu } from '@mantine/core';
import { IconNotification } from '@tabler/icons-react';

/* * */

export function AppWrapperNotificationCentral() {
	//

	//
	// A. Setup variables

	const notificationsContext = useNotificationsContext();

	const notifications = notificationsContext.data.allUserNotifications || [];
	const hasUnread = notifications.some(notification => notification.is_read === false);
	const color = notifications.length && hasUnread ? 'red' : 'gray';
	const notificationCount = notifications.length || 0;

	//
	// B. Render components

	return (
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%">
			<Menu.Target>
				<ActionIcon color={color} variant="subtle">
					{notificationCount > 0 && (
						<div>{notificationCount}</div>
					)}
					<IconNotification size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>
				<AppWrapperNotificationCentralItem />
			</Menu.Dropdown>
		</Menu>
	);

	//
}
