'use client';

/* * */

import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification as TmlNotification } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

import { useMeContext } from './Me.context';

/* * */

interface NotificationsContextState {
	actions: {
		triggerNotificationToast: (title: string, body: string) => void
	}
	data: {
		allNotifications: TmlNotification[]
		allUserNotifications: TmlNotification[]
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
	const [userNotifications, setUserNotificationsData] = useState<[] | TmlNotification[]>([]);

	//
	// B. Fetch data

	const { data: notificationsData, error: notificationsError, isLoading: notificationsLoading } = useSWR<TmlNotification[], HttpException>(`${getAppConfig('auth', 'api_url')}/notifications`, { refreshInterval: 2000 });

	//
	// C. Transform data
	useEffect(() => {
		askNotificationPermission();
	}, []);

	useEffect(() => {
		if (!notificationsData) return;
		const userNotifications = notificationsData.filter(notification => notification.user_id === meContext.data?.user?._id);
		setUserNotificationsData(userNotifications);
	}, [notificationsData, meContext.data?.user?._id]);

	useEffect(() => {
		if (!userNotifications && !notificationsLoading && !notificationsError) return;
		const currentIds = userNotifications.map(n => n._id);
		const prevIds = prevNotificationIdsRef.current;
		const newIds = currentIds.filter(id => !prevIds.includes(id));
		if (prevIds.length > 0 && newIds.length > 0) {
			triggerNotificationToast('Tem uma nova notificação', 'Clique no sino para ver suas notificações.');
		}
		prevNotificationIdsRef.current = currentIds;
	}, [userNotifications, notificationsLoading]);

	//
	// D. Handle actions

	const askNotificationPermission = async (): Promise<boolean> => {
		if (typeof window === 'undefined') return false;

		if (!('Notification' in window)) {
			console.warn('This browser does not support notifications.');
			return false;
		}

		if (!window.isSecureContext) {
			console.warn('Notifications require HTTPS or localhost.');
			return false;
		}

		if (Notification.permission === 'granted') {
			return true;
		}

		if (Notification.permission === 'denied') {
			console.warn('Notification permission was denied.');
			return false;
		}

		try {
			const permission = await Notification.requestPermission();
			return permission === 'granted';
		}
		catch (err) {
			console.error('Error requesting notification permission:', err);
			return false;
		}
	};

	const triggerNotificationToast = async (title: string, body: string) => {
		try {
			const allowed = await askNotificationPermission();
			if (!allowed) {
				console.warn('Notifications not allowed, skipping.');
				return;
			}

			const notification = new Notification(title, { body });
			notification.onclick = () => {
				window.focus();
			};
		}
		catch (err) {
			console.error('Failed to trigger notification:', err);
		}
	};

	//
	// E. Define context value

	const contextValue: NotificationsContextState = useMemo(() => ({
		actions: {
			triggerNotificationToast,
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
