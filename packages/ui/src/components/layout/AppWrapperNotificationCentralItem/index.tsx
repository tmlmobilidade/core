'use client';

/* * */

import { AppWrapperNotificationCentralItemContent } from '@/components/layout/AppWrapperNotificationCentralItemContent';
import { useMeContext } from '@/contexts/Me.context';
import { useNotificationsContext } from '@/contexts/Notifications.context';
import { Menu } from '@mantine/core';
import { Notification } from '@tmlmobilidade/types';

/* * */
export const AppWrapperNotificationCentralItem = () => {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const notificationsContext = useNotificationsContext();
	const allNotifications = meContext.data.user?.active_notifications ? meContext.data.user?.active_notifications : [];
	//
	// B. Handle Actions

	const handleNotificationClick = (notification: Notification) => {
		if (notification.payload?.href) {
			window.open(notification.payload.href, '_blank');
		}

		notificationsContext.actions.markAsRead(notification._id, meContext.data.user?._id || '');
	};

	//
	// C. Render components

	return (
		<>

			{!allNotifications.length && (
				<Menu.Item disabled>Nenhuma notificação</Menu.Item>
			)}

			{allNotifications.map((notification: Notification) => (
				<Menu.Item key={notification._id} onClick={() => handleNotificationClick(notification)}>
					<AppWrapperNotificationCentralItemContent notification={notification} />
				</Menu.Item>
			))}

		</>
	);

	//
};
