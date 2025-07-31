'use client';

/* * */

import { ComponentWrapper, Label } from '@tmlmobilidade/ui';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

const AVAILABLE_GREETINGS = ['Olá', 'Hi', 'Hey', 'Oi', 'Hallo', 'Hola', 'Ciao', 'Hej'];

/* * */

interface AppWrapperHeaderProps {
	userName: string
}

/* * */

export function AppWrapperHeaderExample({ userName }: AppWrapperHeaderProps) {
	//
	const [drawnGreeting] = useState(
		AVAILABLE_GREETINGS[(AVAILABLE_GREETINGS.length * Math.random()) | 0],
	);

	return (
		<ComponentWrapper>

			<div className={styles.container}>
				<Label size="md" caps singleLine>
					{drawnGreeting} {userName}
				</Label>
			</div>

		</ComponentWrapper>
	);
}
