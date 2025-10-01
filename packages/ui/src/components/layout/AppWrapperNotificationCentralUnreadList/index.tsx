'use client';

/* * */

import { Button } from '@/components/buttons';
import { AppWrapperNotificationCentralItemContent } from '@/components/layout/AppWrapperNotificationCentralItemContent';
import { Menu } from '@mantine/core';
import { Notification } from '@tmlmobilidade/types';
import { useState } from 'react';

/* * */

interface AppWrapperNotificationCentralUnreadListProps {
	notifications: Notification[]
}

/* * */

export function AppWrapperNotificationCentralUnreadList({ notifications }: AppWrapperNotificationCentralUnreadListProps) {
	//

	//
	// A. Setup variables

	const [showAll, setShowAll] = useState(false);
	const displayNotifications = showAll ? notifications : notifications.slice(0, 5);
	const hasMoreNotifications = notifications.length > 5;

	//
	// B.Handle Actions

	const handleShowMore = () => {
		setShowAll(!showAll);
	};

	//
	// C. Render components

	return (
		<>
			<Menu.Label>Não Lidas ({notifications.length})</Menu.Label>

			{displayNotifications.map((notification: Notification) => (
				<Menu.Item key={notification._id}>
					<AppWrapperNotificationCentralItemContent notification_id={notification._id} />
				</Menu.Item>
			))}

			{hasMoreNotifications && (
				<Button label={showAll ? 'Mostrar menos' : `Mostrar mais (${notifications.length - 5}) não lidas`} onClick={handleShowMore} variant="secondary" fullWidth />
			)}
		</>
	);

	//
}
