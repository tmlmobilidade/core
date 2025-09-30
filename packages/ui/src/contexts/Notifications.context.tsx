'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { useMeContext } from './Me.context';

/* * */

interface NotificationsContextState {
	count: {
		unreadNotifications: number
	}
	data: {
		allNotifications: Notification[]
		allUserNotifications: Notification[]
	}
	flags: {
		error?: HttpException
		loading: boolean
	}
}

/* * */

const NotificationsContext = createContext<NotificationsContextState | undefined>(undefined);

export function useNotificationsContext() {
	const context = useContext(NotificationsContext);
	if (!context) throw new Error('useNotificationsContext must be used within a NotificationsContextProvider');
	return context;
}

/* * */

export const NotificationsContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const [userNotifications, setUserNotificationsData] = useState<[] | Notification[]>([]);
	const [unreadNotifications, setUnreadNotifications] = useState<number>(0);

	//
	// B. Fetch data

	const { data: notificationsData, error: notificationsError, isLoading: notificationsLoading } = useSWR<Notification[], HttpException>(`${getAppConfig('auth', 'api_url')}/notifications`, { refreshInterval: 5000 });

	//
	// C. Transform data

	useEffect(() => {
		if (!notificationsData) return;
		const userNotifications = notificationsData.filter(notification => notification.user_id === meContext.data?.user?._id);
		setUserNotificationsData(userNotifications);
	}, [notificationsData, meContext.data?.user?._id]);

	useEffect(() => {
		if (!userNotifications) return;
		const filteredNotifications = userNotifications.filter(notification => !notification.is_read);
		setUnreadNotifications(filteredNotifications.length);
	}, [userNotifications, notificationsData]);

	//
	// D. Define context value

	const contextValue: NotificationsContextState = useMemo(() => ({
		count: {
			unreadNotifications: unreadNotifications,
		},
		data: {
			allNotifications: notificationsData ?? [],
			allUserNotifications: userNotifications ?? [],
		},
		flags: {
			error: notificationsError,
			loading: notificationsLoading,
		},
	}), [notificationsData, unreadNotifications, notificationsError, notificationsLoading, userNotifications]);

	//
	// E. Render components

	return (
		<NotificationsContext.Provider value={contextValue}>
			{children}
		</NotificationsContext.Provider>
	);

	//
};
