'use client';

/* * */

import { notifications } from '@tmlmobilidade/interfaces';
import { getAppConfig, HttpException } from '@tmlmobilidade/lib';
import { Notification } from '@tmlmobilidade/types';
import { createContext, type PropsWithChildren, useContext, useMemo } from 'react';
import useSWR from 'swr';

/* * */

interface NotificationsContextState {
	actions: {
		markAsRead: (notificationId: string, userId: string) => void
	}
	data: {
		allNotifications: Notification[]
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
	// B. Fetch data

	const { data: notificationsData, error: notificationsError, isLoading: notificationsLoading } = useSWR<Notification[], HttpException>(`${getAppConfig('auth', 'api_url')}/notifications`);

	//
	// C. Handle actions

	async function markAsRead(notificationId: string, userId: string) {
		console.log('Marking notification as read from context:', notificationId, userId);
		await notifications.markAsRead(notificationId, userId);
	}

	//
	// D. Define context value

	const contextValue: NotificationsContextState = useMemo(() => ({
		actions: {
			markAsRead,
		},
		data: {
			allNotifications: notificationsData ?? [],
		},
		flags: {
			error: notificationsError,
			loading: notificationsLoading,
		},
	}), [notificationsData, notificationsError, notificationsLoading]);

	//
	// B. Render components

	return (
		<NotificationsContext.Provider value={contextValue}>
			{children}
		</NotificationsContext.Provider>
	);

	//
};
