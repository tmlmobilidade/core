'use client';

/* * */

import { useState } from 'react';

// import AppOptions from '../Options';
import { HeaderProps } from '..';
import styles from './styles.module.css';

/* * */

const greetings = ['Olá', 'Hi', 'Hey', 'Oi', 'Hallo', 'Ciao', 'Hej'];

/* * */

export default function Header({ user_name }: HeaderProps) {
	//

	//
	// A. Setup variables

	const [drawnGreeting] = useState(greetings[(greetings.length * Math.random()) | 0]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<p className={styles.greeting}>{drawnGreeting} {user_name}</p>
			<div className={styles.options}>
				{/* <AppOptions /> */}
			</div>
		</div>
	);

	//
}
