'use client';

import { Section } from '@/components';
import { Label } from '@/components/display/Label';

/* * */

import { AppWrapperNotificationCentralItemContent } from '@/components/layout/AppWrapperNotificationCentralItemContent';
import { Notification } from '@tmlmobilidade/types';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface AppWrapperNotificationCentralListProps {
	notifications: Notification[]
	title: string
}

/* * */

export function AppWrapperNotificationCentralList({ notifications, title }: AppWrapperNotificationCentralListProps) {
	//

	//
	// A. Setup variables

	const [showAll, setShowAll] = useState(false);
	const displayNotifications = useMemo(() => {
		return showAll ? notifications : notifications.slice(0, 5);
	}, [notifications, showAll]);

	//
	// C. Render components
	if (notifications.length === 0) {
		return null;
	}

	return (
		<Section flexDirection="column" gap="sm" padding="sm" width="100%">
			<Label size="sm">{title} ({notifications.length})</Label>
			{displayNotifications.map(notification => (
				<AppWrapperNotificationCentralItemContent key={notification._id} notification={notification} />
			))}
			{notifications.length > 5 && (
				<button className={styles.moreButton} onClick={() => setShowAll(!showAll)}>
					{showAll ? 'Ver menos' : 'Ver mais'}
				</button>
			)}
		</Section>
	);

	//
}
