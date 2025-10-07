'use client';

import { Label } from '@/components/display/Label';
/* * */

import { AppWrapperNotificationCentralList } from '@/components/layout/AppWrapperNotificationCentralList';
import { Section } from '@/components/layout/Section';
import { useNotificationsContext } from '@/contexts/Notifications.context';
import { ActionIcon, Menu } from '@mantine/core';
import { IconBell, IconBellOff } from '@tabler/icons-react';

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
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%">
			<Menu.Target>
				<ActionIcon color={unreadNotifications.length > 0 ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)'} variant="subtle">
					{notifications.length > 0 && (
						<div>{notifications.length}</div>
					)}
					<IconBell size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown style={{ maxHeight: '90vh', overflow: 'scroll' }}>
				<AppWrapperNotificationCentralList notifications={unreadNotifications} title="Não Lidas" />
				<AppWrapperNotificationCentralList notifications={readNotifications} title="Lidas" />

				{notifications.length === 0 && (
					<Section alignItems="center" gap="md" justifyContent="center">
						<IconBellOff color="var(--color-system-text-200)" />
						<Label>Sem Notificações</Label>
					</Section>
				)}

			</Menu.Dropdown>
		</Menu>
	);

	//
}
