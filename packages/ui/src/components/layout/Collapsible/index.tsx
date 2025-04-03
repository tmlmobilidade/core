'use client';

/* * */

import { Accordion as MantineAccordion, type AccordionStylesNames as MantineAccordionStylesNames } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import React from 'react';

import styles from './styles.module.css';

/* * */

interface CollapsibleProps {
	children: React.ReactNode
	classNames?: Partial<Record<MantineAccordionStylesNames, string>>
	defaultOpen?: boolean
	description?: string
	icon?: React.ReactNode
	title: string
	titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

/* * */

export function Collapsible({ children, classNames, defaultOpen = false, description, icon, title, titleAs = 'h2' }: CollapsibleProps) {
	//

	//
	// A. Render components

	const renderControl = () => {
		return (
			<div className={styles.titleWrapper}>
				{icon && icon}
				{React.createElement(
					titleAs,
					{ className: styles.title },
					title,
				)}
				{description && <p className={styles.description}>{description}</p>}
			</div>
		);
	};

	return (
		<MantineAccordion
			chevron={<IconCaretLeftFilled className={styles.icon} />}
			classNames={{ ...styles, ...classNames }}
			defaultValue={defaultOpen ? 'section' : undefined}
		>
			<MantineAccordion.Item value="section">
				<MantineAccordion.Control>{renderControl()}</MantineAccordion.Control>
				<MantineAccordion.Panel>{children}</MantineAccordion.Panel>
			</MantineAccordion.Item>
		</MantineAccordion>
	);

	//
}
