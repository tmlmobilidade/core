'use client';

/* * */

import { IconAlertCircle, IconBell, IconFileCheck } from '@tabler/icons-react';
import { ReactElement } from 'react';

/* * */
interface AppWrapperNotificationCentralItemContentProps {
	scope: string
}

/* * */
export const AppWrapperNotificationCentralItemContentIcon = ({ scope }: AppWrapperNotificationCentralItemContentProps) => {
	//

	//
	// A. Setup variables

	const iconMap: Record<string, ReactElement> = {
		alerts: <IconAlertCircle size={32} />,
		validations: <IconFileCheck size={32} />,
		// Add more mappings as needed - validations, alerts, etc.
	};

	const IconComponent = iconMap[scope] || <IconBell size={32} />;

	//
	// B. Render components

	return IconComponent;

	//
};
