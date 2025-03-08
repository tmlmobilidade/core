'use client';

import { Accordion, AccordionStylesNames } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';
import React from 'react';

import styles from './styles.module.css';

interface SectionProps {
	children: React.ReactNode
	classNames?: Partial<Record<AccordionStylesNames, string>>
	description?: string
	icon?: React.ReactNode
	title: string
	titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function Section({
	children,
	classNames,
	description,
	icon,
	title,
	titleAs = 'h2',
}: SectionProps) {
	//
	// B. Render Component
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
		<Accordion
			chevron={<IconCaretLeftFilled className={styles.icon} />}
			classNames={{ ...styles, ...classNames }}
		>
			<Accordion.Item value="section">
				<Accordion.Control>{renderControl()}</Accordion.Control>
				<Accordion.Panel>{children}</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
