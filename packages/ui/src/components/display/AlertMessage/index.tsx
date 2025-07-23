/* * */

import { Alert as MantineAlert } from '@mantine/core';

/* * */

interface AlertMessageProps {
	icon?: React.ReactNode
	message?: string
	title?: string
}

/* * */

export function AlertMessage({ icon, message, title }: AlertMessageProps) {
	return (
		<MantineAlert icon={icon} title={title}>
			{message}
		</MantineAlert>
	);
}
