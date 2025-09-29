'use client';

/* * */

import { AppWrapperNotificationCentralItemContent } from '@/components/layout/AppWrapperNotificationCentralItemContent';
import { useNotificationsContext } from '@/contexts/Notifications.context';
import { Menu } from '@mantine/core';
import { Notification } from '@tmlmobilidade/types';

/* * */
export const AppWrapperNotificationCentralItem = () => {
	//

	//
	// A. Setup variables

	const notificationsContext = useNotificationsContext();
	const allNotifications = notificationsContext.data.allNotifications || [];
	//
	// B. Handle Actions

	//
	// C. Render components

	return (
		<>

			{!allNotifications.length && (
				<Menu.Item disabled>Nenhuma notificação</Menu.Item>
			)}

			{allNotifications.map((notification: Notification) => (
				<Menu.Item key={notification._id}>
					<AppWrapperNotificationCentralItemContent notification_id={notification._id} />
				</Menu.Item>
			))}

		</>
	);

	//
};
