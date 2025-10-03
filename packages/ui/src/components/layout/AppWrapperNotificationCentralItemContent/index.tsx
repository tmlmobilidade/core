'use client';

/* * */

import { AppWrapperNotificationCentralItemContentIcon } from '@/components/layout/AppWrapperNotificationCentralItemContentIcon';
import { IconX } from '@tabler/icons-react';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface AppWrapperNotificationCentralItemContentProps {
	notificationId: string
}

/* * */
export const AppWrapperNotificationCentralItemContent = ({ notificationId }: AppWrapperNotificationCentralItemContentProps) => {
	//

	//
	// A. Setup variables

	const { data: notificationData, error: notificationError, isLoading: notificationLoading } = useSWR<Notification, HttpException>(`${getAppConfig('auth', 'api_url')}/notifications/${notificationId}`);
	//
	// C. Handle actions

	const handleNotificationClick = async () => {
		await fetchData(`${getAppConfig('auth', 'api_url')}/notifications/${notificationId}/mark-as-read`);
		if (notificationData?.payload?.href) {
			window.open(notificationData.payload.href, '_blank');
		}
	};

	const handleNotificationDelete = async (notificationId: string, e: React.MouseEvent<SVGElement>) => {
		if (!notificationId) return;
		e.stopPropagation();
		await fetchData(`${getAppConfig('auth', 'api_url')}/notifications/${notificationId}`, 'DELETE');
	};

	//
	// D. Render components

	if (!notificationData && notificationLoading && !notificationError) {
		return <div>A carregar...</div>;
	}

	if (notificationError) {
		return <div>Erro ao carregar notificação</div>;
	}

	return (
		<div className={notificationData?.is_read ? styles.notificationContentWrapperRead : styles.notificationContentWrapperUnread} onClick={handleNotificationClick}>
			<p className={styles.notificationTitle}>{notificationData?.payload?.title || 'Sem titulo'}</p>
			<p className={styles.notificationBody}>{notificationData?.payload?.body || 'Sem Descrição'}</p>
			<div className={styles.notificationRight}>
				<div className={styles.notificationRightImage}>
					<AppWrapperNotificationCentralItemContentIcon scope={notificationData?.payload?.icon || ''} />
				</div>
				<IconX className={styles.notificationDeleteIcon} onClick={e => handleNotificationDelete(notificationId, e)} size={16} />
			</div>
		</div>
	);

	//
};
