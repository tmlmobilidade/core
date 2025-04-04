'use client';

/* * */

import { Skeleton } from '@mantine/core';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const AVAILABLE_GREETINGS = ['Olá', 'Hi', 'Hey', 'Oi', 'Hallo', 'Ciao', 'Hej'];

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
			<p className={styles.greeting}>{drawnGreeting} {userName}</p>
		</div>
	);

	//
}
