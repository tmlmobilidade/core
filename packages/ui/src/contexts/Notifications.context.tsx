'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

import { useMeContext } from './Me.context';

/* * */

interface NotificationsContextState {
	actions: {
		triggerNotificationToast: () => void
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
	const prevNotificationIdsRef = useRef<string[]>([]);
	const [userNotifications, setUserNotificationsData] = useState<[] | Notification[]>([]);

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
		const currentIds = userNotifications.map(n => n._id);
		const prevIds = prevNotificationIdsRef.current;
		const newIds = currentIds.filter(id => !prevIds.includes(id));
		if (newIds.length > 0) {
			triggerNotificationToast();
		}
		prevNotificationIdsRef.current = currentIds;
	}, [userNotifications]);

	//
	// D. Handle actions

	const handleNotificationPermission = async () => {
		if (typeof window === 'undefined') return;

		if (!('Notification' in window)) {
			alert('Notifications are not supported in this browser');
			return;
		}

		if (Notification.permission !== 'granted') {
			const permission = await Notification.requestPermission();
			if (permission !== 'granted') {
				alert('Notifications blocked');
				return;
			}
		}
	};

	const triggerNotificationToast = async () => {
		handleNotificationPermission();
		new Notification('🔔 Hello!', {
			body: 'This is a test notification',
		});
	};

	//
	// E. Define context value

	const contextValue: NotificationsContextState = useMemo(() => ({
		actions: {
			triggerNotificationToast: triggerNotificationToast,
		},
		data: {
			allNotifications: notificationsData ?? [],
			allUserNotifications: userNotifications ?? [],
		},
		flags: {
			error: notificationsError,
			loading: notificationsLoading,
		},
	}), [notificationsData, notificationsError, notificationsLoading, userNotifications]);

	//
	// E. Render components

	return (
		<NotificationsContext.Provider value={contextValue}>
			{children}
		</NotificationsContext.Provider>
	);

	//
};
