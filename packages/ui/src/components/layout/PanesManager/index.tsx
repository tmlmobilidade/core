'use client';

/* * */

import { type ReactNode, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

const GRIP_WIDTH = 20; // Pixels
const MIN_PANE_FRACTION = 0.3; // Smallest size a pane can have in fraction units

interface PanesManagerProps {
	panes: ReactNode[]
}

/* * */

export function PanesManager({ panes }: PanesManagerProps) {
	//

	//
	// A. Setup variables

	const containerRef = useRef<HTMLDivElement | null>(null);

	const [paneFractions, setPaneFractions] = useState<number[]>(Array(panes.length).fill(1 / panes.length));

	//
	// B. Transform data

	const gridTemplateColumns = paneFractions
		.flatMap((fraction, index) => [
			`${fraction}fr`,
			index < panes.length - 1 ? `${GRIP_WIDTH}px` : null,
		])
		.filter(Boolean)
		.join(' ');

	//
	// C. Handle actions

	const handleMouseDown = (index: number, mouseDownEvent: React.MouseEvent) => {
		// Prevent default behavior (e.g., text selection)
		mouseDownEvent.preventDefault();
		// Get the width of the parent container
		const containerWidth = containerRef.current?.getBoundingClientRect().width || 1;
		// Set the global cursor to indicate resizing
		document.body.style.cursor = 'grabbing';
		// Handle the mouse movement
		const onMouseMove = (moveMoveEvent: MouseEvent) => {
			// Calculate the difference in mouse position
			// and what that means in terms of fractions of the container width
			const deltaX = moveMoveEvent.clientX - mouseDownEvent.clientX;
			const deltaFraction = deltaX / containerWidth;
			// Calculate the new fractions for the panes
			const newFractions = [...paneFractions];
			newFractions[index] = (newFractions[index] ?? 0) + deltaFraction;
			newFractions[index + 1] = (newFractions[index + 1] ?? 0) - deltaFraction;
			// Ensure panes respect min fraction constraint
			if (newFractions.some(f => f < MIN_PANE_FRACTION)) return;
			// Normalize fractions to maintain total sum of 1
			const total = newFractions.reduce((sum, val) => sum + val, 0);
			const newFractionsNormalized = newFractions.map(f => f / total);
			// Update the state with the new values
			setPaneFractions(newFractionsNormalized);
		};
		// Reset the cursor to default and remove the event listeners
		const onMouseUp = () => {
			document.body.style.cursor = '';
			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', onMouseUp);
		};
		// Add event listeners for mouse movement and release
		document.addEventListener('mousemove', onMouseMove);
		document.addEventListener('mouseup', onMouseUp);
	};

	//
	// D. Render components

	if (panes.length > 2) {
		return <p>Currently, only 2 panes are supported.</p>;
	}

	return (
		<div ref={containerRef} className={styles.container} style={{ gridTemplateColumns }}>
			{panes.map((pane, index) => (
				<div key={index} className={styles.innerWrapper}>
					{pane}
					{(index < panes.length - 1) && (
						<div
							className={styles.grip}
							onMouseDown={event => handleMouseDown(index, event)}
							style={{ '--grip-width': GRIP_WIDTH } as React.CSSProperties}
						/>
					)}
				</div>
			))}
		</div>
	);

	//
}
