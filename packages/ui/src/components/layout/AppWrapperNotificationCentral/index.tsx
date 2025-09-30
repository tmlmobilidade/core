'use client';

/* * */

import { AppWrapperNotificationCentralReadList } from '@/components/layout/AppWrapperNotificationCentralReadList';
import { AppWrapperNotificationCentralUnreadList } from '@/components/layout/AppWrapperNotificationCentralUnreadList';
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
	const UnreadNotificationsCount = notificationsContext.count.unreadNotifications;
	const notificationCount = notifications.length || 0;

	const unreadNotifications = notifications.filter(n => !n.is_read);
	const readNotifications = notifications.filter(n => n.is_read);

	//
	// B. Render components

	return (
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%">
			<Menu.Target>
				<ActionIcon color={UnreadNotificationsCount > 0 ? '#C73B3B' : 'gray'} variant="subtle">
					{notificationCount > 0 && (
						<div>{notificationCount}</div>
					)}
					<IconNotification size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>

				{notifications.length === 0 && (
					<p>Sem Notificações</p>
				)}

				{unreadNotifications.length > 0 && (
					<AppWrapperNotificationCentralUnreadList notifications={unreadNotifications} />
				)}

				{readNotifications.length > 0 && (
					<AppWrapperNotificationCentralReadList notifications={readNotifications} />
				)}

			</Menu.Dropdown>
		</Menu>
	);

	//
}
