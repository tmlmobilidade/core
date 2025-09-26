'use client';

/* * */

import { useMeContext } from '@/contexts';
import { ActionIcon, Menu } from '@mantine/core';
import { IconNotification } from '@tabler/icons-react';
import { Notification } from '@tmlmobilidade/types';

/* * */

export function AppWrapperNotificationCentral() {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const notifications = meContext.data.user?.active_notifications ? meContext.data.user?.active_notifications : [];
	const color = notifications.length ? 'red' : 'gray';
	const notificationCount = notifications.length || 0;

	console.log('Active notifications:', notifications);

	//
	// B. Handle Actions

	const handleNotificationClick = (notification: Notification) => {
		console.log('Notification clicked:', notification);
	};

	//
	// C. Render components

	const renderNotifications = () => {
		return (
			<>
				{!notifications.length && (
					<Menu.Item disabled>Nenhuma notificação</Menu.Item>
				)}
				{notifications.map((notification: Notification) => (
					<Menu.Item key={notification._id} onClick={() => handleNotificationClick(notification)}>{notification.payload?.title || 'Sem titulo'}</Menu.Item>
				))}
			</>
		);
	};

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
				{renderNotifications()}
			</Menu.Dropdown>
		</Menu>
	);

	//
}
