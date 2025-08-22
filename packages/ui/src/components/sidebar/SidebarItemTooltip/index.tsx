'use client';

/* * */

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './styles.module.css';

/* * */

interface SidebarItemTooltipProps {
	label: string
	target: HTMLElement | null
}

/* * */

export function SidebarItemTooltip({ label, target }: SidebarItemTooltipProps) {
	//

	//
	// A. Setup variables

	const [root, setRoot] = useState<HTMLElement | null>(null);

	//
	// B. Transform data

	const rect = target?.getBoundingClientRect();

	//
	// B. Handle actions

	useEffect(() => {
		const el = document.getElementById('tooltip-root');
		if (el) setRoot(el);
		else {
			const newEl = document.createElement('div');
			newEl.id = 'tooltip-root';
			document.body.appendChild(newEl);
		}
	}, []);

	//
	// C. Render components

	if (!root || !rect) {
		return null;
	}

	return createPortal(
		<div
			className={styles.tooltip}
			style={{
				left: rect.right + 8,
				top: rect.top + rect.height / 2,
				transform: 'translateY(-50%)',
				zIndex: 1000,
			}}
		>
			{label}
		</div>,
		root,
	);
}
