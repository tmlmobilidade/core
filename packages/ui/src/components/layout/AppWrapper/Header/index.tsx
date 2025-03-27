'use client';

/* * */

import { useState } from 'react';

// import AppOptions from '../Options';
import styles from './styles.module.css';

/* * */

const greetings = ['Olá', 'Hi', 'Hey', 'Oi', 'Hallo', 'Ciao', 'Hej'];

/* * */

export default function Header({ userName }: { userName?: string }) {
	//

	//
	// A. Setup variables

	const [drawnGreeting] = useState(greetings[(greetings.length * Math.random()) | 0]);

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<p className={styles.greeting}>{drawnGreeting} {userName}</p>
			<div className={styles.options}>
				{/* <AppOptions /> */}
			</div>
		</div>
	);

	//
}
