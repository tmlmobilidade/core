'use client';

/* * */

import { Image } from '@mantine/core';
import { getAppConfig } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface AppWrapperNotificationCentralItemContentProps {
	notification_id: string
}

/* * */
export const AppWrapperNotificationCentralItemContent = ({ notification_id }: AppWrapperNotificationCentralItemContentProps) => {
	//

	//
	// A. Setup variables

	const [notificationData, setNotificationData] = useState<Notification | null>(null);
	const title = notificationData?.payload?.title || 'Sem titulo';
	const icon = notificationData?.payload?.icon;
	const body = notificationData?.payload?.body || 'Sem corpo';

	console.log(icon);
	//
	// B. Fetch data

	useEffect(() => {
		getNotificationData().then((response) => {
			return setNotificationData(response.data);
		});
	}, [notification_id]);

	const getNotificationData = async () => {
		const notificationResponse = await fetchData<Notification>(`${getAppConfig('auth', 'api_url')}/notifications/${notification_id}`, 'GET', undefined);
		return notificationResponse;
	};

	//
	// C. Render components

	const handleNotificationClick = (notification: Notification) => {
		if (!notification) return;
		if (notification.payload?.href) {
			window.open(notification.payload.href, '_blank');
		}
	};

	return (
		<div className={styles.notificationContentWrapper} onClick={() => notificationData && handleNotificationClick(notificationData)}>
			<div className={styles.notificationLeftTop}>
				<p className={styles.notificationTitle}>{title}</p>
			</div>

			<div className={styles.notificationLeftBottom}>
				<p className={styles.notificationBody}>{body}</p>
			</div>

			<div className={styles.notificationRight}>
				{icon ? <Image alt="Icon" height={50} src={icon} width={50} /> : <span>Sem Imagem</span>}
			</div>
		</div>
	);

	//
};
