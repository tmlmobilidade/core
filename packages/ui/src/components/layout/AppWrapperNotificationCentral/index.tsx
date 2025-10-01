'use client';

/* * */

import { AppWrapperNotificationCentralReadList } from '@/components/layout/AppWrapperNotificationCentralReadList';
import { AppWrapperNotificationCentralUnreadList } from '@/components/layout/AppWrapperNotificationCentralUnreadList';
import { useNotificationsContext } from '@/contexts/Notifications.context';
import { ActionIcon, Menu } from '@mantine/core';
import { IconBell } from '@tabler/icons-react';

/* * */

export function AppWrapperNotificationCentral() {
	//

	//
	// A. Setup variables

	const notificationsContext = useNotificationsContext();

	const notifications = notificationsContext.data.allUserNotifications || [];
	const unreadNotifications = notifications.filter(n => !n.is_read);
	const readNotifications = notifications.filter(n => n.is_read);

	//
	// B. Render components

	return (
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%">
			<Menu.Target>
				<ActionIcon color={unreadNotifications.length > 0 ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)'} variant="subtle">
					{notifications.length > 0 && (
						<div>{notifications.length}</div>
					)}
					<IconBell size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown>

				{unreadNotifications.length > 0 && (
					<AppWrapperNotificationCentralUnreadList notifications={unreadNotifications} />
				)}

				{readNotifications.length > 0 && (
					<AppWrapperNotificationCentralReadList notifications={readNotifications} />
				)}

				{notifications.length === 0 && (
					<p>Sem Notificações</p>
				)}

			</Menu.Dropdown>
		</Menu>
	);

	//
}
