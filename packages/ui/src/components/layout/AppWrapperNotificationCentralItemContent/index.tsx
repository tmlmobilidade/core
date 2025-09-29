'use client';

/* * */

import { Image } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
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

	const handleNotificationClick = async (notification: Notification) => {
		if (!notification) return;
		const { _id, created_at, created_by, updated_at, ...updateData } = notification;
		await fetchData(`${getAppConfig('auth', 'api_url')}/notifications/mark-as-read/${notification._id}`, 'PUT', updateData, undefined);
		if (notification.payload?.href) {
			window.open(notification.payload.href, '_blank');
		}
	};

	const handleNotificationDelete = async (notificationId: string, e: React.MouseEvent<SVGElement>) => {
		e.stopPropagation();
		if (!notificationId) return;
		await fetchData(`${getAppConfig('auth', 'api_url')}/notifications/${notificationId}`, 'DELETE');
		console.log('delete noti id', notificationId);
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
				<div className={styles.notificationRightImage}>
					{icon && <Image alt="Icon" height={50} src={icon} width={50} />}
				</div>
				<div className={styles.notificationRightDelete}>
					<IconX className={styles.notificationDeleteIcon} onClick={e => handleNotificationDelete(notification_id, e)} size={16} />
				</div>
			</div>
		</div>
	);

	//
};
