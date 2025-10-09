/* * */

import { Button as MantineButton, type ButtonGroupProps as MantineButtonGroupProps } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export interface ButtonGroupProps extends MantineButtonGroupProps {
	buttons: { label: string, onclick: () => void, variant?: 'danger' | 'disabled' | 'muted' | 'primary' | 'secondary' }[]
}

/* * */

export function ButtonGroup({ buttons }: ButtonGroupProps) {
	//

	//
	// A. Setup Variables

	//

	// B. Render Components
	return (
		<MantineButton.Group className={styles.buttonGroup}>
			{buttons.map((button, index) => (
				<MantineButton key={index} onClick={button.onclick} variant={button.variant}>
					{button.label}
				</MantineButton>
			))}
		</MantineButton.Group>
	);

	//
};
