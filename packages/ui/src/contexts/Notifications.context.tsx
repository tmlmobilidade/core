'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';

import { useMeContext } from './Me.context';

/* * */

interface NotificationsContextState {
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

	//
	// B. Fetch data

	const { data: notificationsData, error: notificationsError, isLoading: notificationsLoading } = useSWR<Notification[], HttpException>(`${getAppConfig('auth', 'api_url')}/notifications`);

	//
	// C. Transform data

	useEffect(() => {
		if (notificationsData) {
			const userNotifications = notificationsData.filter(notification => notification.user_id === meContext.data?.user?._id);
			setUserNotificationsData(userNotifications);
		}
	}, [notificationsData, meContext.data?.user?._id]);

	//
	// D. Define context value

	const contextValue: NotificationsContextState = useMemo(() => ({
		data: {
			allNotifications: notificationsData ?? [],
			allUserNotifications: userNotifications ?? [],
		},
		flags: {
			error: notificationsError,
			loading: notificationsLoading,
		},
	}), [notificationsData, notificationsError, notificationsLoading]);

	//
	// E. Render components

	return (
		<NotificationsContext.Provider value={contextValue}>
			{children}
		</NotificationsContext.Provider>
	);

	//
};
