'use client';

/* * */

import { Image } from '@mantine/core';
import { Notification } from '@tmlmobilidade/types';

import styles from './styles.module.css';

/* * */

interface AppWrapperNotificationCentralItemContentProps {
	notification: Notification
}

/* * */
export const AppWrapperNotificationCentralItemContent = ({ notification }: AppWrapperNotificationCentralItemContentProps) => {
	//

	//
	// A. Setup variables

	const title = notification.payload?.title || 'Sem titulo';
	const icon = notification.payload?.icon || '';
	const body = notification.payload?.body || 'Sem corpo';

	//
	// C. Render components

	return (
		<div className={styles.notificationContentWrapper}>
			<div className={styles.notificationLeftTop}>
				<p className={styles.notificationTitle}>{title}</p>
			</div>

			<div className={styles.notificationLeftBottom}>
				<p className={styles.notificationBody}>{body}</p>
			</div>

			<div className={styles.notificationRight}>
				<Image alt="Icon" height={50} src={icon} width={50} />
			</div>
		</div>
	);

	//
};
