'use client';

/* * */

import { themeData } from '@/styles/theme';
import { MantineProvider } from '@mantine/core';
import { DatesProvider, DatesProviderSettings } from '@mantine/dates';
import { Notifications } from '@mantine/notifications';
import { type PropsWithChildren } from 'react';

/**
 * This is the application base provider component. The whole application should be
 * wrapped with this component, including non-authenticated parts. Set this on the Root layout,
 * without `<html>` or `<body>` HTML tags.
 */
export function BaseProvider({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const mantineDatesSettings: Partial<DatesProviderSettings> = {
		firstDayOfWeek: 1,
		locale: 'pt',
		weekendDays: [6, 0],
	};

	//
	// B. Render components

	return (
		<html data-theme="ocean" lang="pt">
			<body>
				<MantineProvider defaultColorScheme="auto" theme={themeData}>
					<DatesProvider settings={mantineDatesSettings}>
						<Notifications styles={{ root: { marginTop: '60px' } }} />
						{children}
					</DatesProvider>
				</MantineProvider>
			</body>
		</html>
	);

	//
}
