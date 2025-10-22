'use client';

/* * */

import { useNotificationsContext } from '@/contexts/Notifications.context';
import { IconBell, IconBellOff } from '@tabler/icons-react';

import { AppWrapperMenu } from '../AppWrapperMenu';
import { AppWrapperMenuList } from '../AppWrapperMenuList';
import { AppWrapperMenuNoContent } from '../AppWrapperMenuNoContent';
import { AppWrapperNotificationsItem } from '../AppWrapperNotificationsItem';

/* * */

export function AppWrapperNotificationCentral() {
	//

	//
	// A. Setup variables

	const notificationsContext = useNotificationsContext();

	const notifications = notificationsContext.data.allNotifications || [];
	const unreadNotifications = notificationsContext.data.unreadNotifications || [];
	const readNotifications = notificationsContext.data.readNotifications || [];

	//
	// B. Render components

	return (
		<AppWrapperMenu counter={unreadNotifications.length} icon={IconBell}>

			<AppWrapperMenuList data={unreadNotifications} itemComponent={({ item }) => <AppWrapperNotificationsItem notification={item} />} title="Não Lidas" />
			<AppWrapperMenuList data={readNotifications} itemComponent={({ item }) => <AppWrapperNotificationsItem	notification={item} />} title="Lidas" />

			{notifications.length === 0 && (
				<AppWrapperMenuNoContent icon={IconBellOff} text="Sem notificações disponíveis" />
			)}
		</AppWrapperMenu>
	);

	//
}
