'use client';

/* * */

import { notifications } from '@tmlmobilidade/interfaces';
import { createContext, type PropsWithChildren, useContext } from 'react';

/* * */

interface NotificationsContextState {
	actions: {
		markAsRead: (notificationId: string, userId: string) => void
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
	// A. Handle actions

	async function markAsRead(notificationId: string, userId: string) {
		console.log('Marking notification as read from context:', notificationId, userId);
		await notifications.markAsRead(notificationId, userId);
	}

	//
	// D. Define context value

	const contextValue: NotificationsContextState = {
		actions: {
			markAsRead,
		},
	};

	//
	// B. Render components

	return (
		<NotificationsContext.Provider value={contextValue}>
			{children}
		</NotificationsContext.Provider>
	);

	//
};
