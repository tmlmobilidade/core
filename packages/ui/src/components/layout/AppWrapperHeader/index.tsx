'use client';

/* * */

import { Label } from '@/components/display/Label';
import { Skeleton } from '@mantine/core';
import { IconCloudDown } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

import { AppWrapperExportCentral } from '../AppWrapperExportCentral';
import { AppWrapperMenu } from '../AppWrapperMenu';
import { AppWrapperNotificationCentral } from '../AppWrapperNotificationCentral';
import { AppWrapperOptions } from '../AppWrapperOptions';
import { Spacer } from '../Spacer';

/* * */

const AVAILABLE_GREETINGS = ['Olá', 'Hi', 'Hey', 'Oi', 'Hallo', 'Hola', 'Ciao', 'Hej'];

/* * */

interface AppWrapperHeaderProps {
	userName?: string
}

/* * */

export function AppWrapperHeader({ userName }: AppWrapperHeaderProps) {
	//

	//
	// A. Setup variables

	const [drawnGreeting] = useState(AVAILABLE_GREETINGS[(AVAILABLE_GREETINGS.length * Math.random()) | 0]);

	//
	// B. Render components

	if (!userName) {
		return (
			<div className={styles.container}>
				<Skeleton h={18} w={120} />
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<Label size="md" caps singleLine>{drawnGreeting} {userName}</Label>
			<Spacer />
			<AppWrapperMenu counter={10} icon={IconCloudDown}>hello</AppWrapperMenu>
			<AppWrapperMenu counter={0} icon={IconCloudDown}>hello</AppWrapperMenu>
			<AppWrapperMenu counter={-30} icon={IconCloudDown}>hello</AppWrapperMenu>
			<AppWrapperMenu counter={99} icon={IconCloudDown}>hello</AppWrapperMenu>
			<AppWrapperMenu counter={120} icon={IconCloudDown}>hello</AppWrapperMenu>
			<AppWrapperExportCentral />
			<AppWrapperNotificationCentral />
			<AppWrapperOptions />
		</div>
	);

	//
}
