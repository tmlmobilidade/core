'use client';

import { ActionIcon } from '@mantine/core';

interface LinkProps {
	href: string
	type: 'link'
}

interface ButtonProps {
	onClick: () => void
	type?: 'button'
}

type IconButtonProps = (ButtonProps | LinkProps) & {
	color?: string
	disabled?: boolean
	icon: React.ReactNode
	isLoading?: boolean
	isReadOnly?: boolean
};

export function IconButton(props: IconButtonProps) {
	//

	//
	// A. Define variables

	const { color, disabled, icon, isLoading, isReadOnly } = props;
	const isLink = props.type === 'link';

	//
	// B. Handle actions
	const handleClick = () => {
		// If the button is loading or in read-only mode,
		// do not trigger the onClick action
		if (isLoading || isReadOnly) return;

		// Trigger the onClick action
		if ('onClick' in props && props.onClick) {
			props.onClick();
		}
	};

	//
	// C. Render components

	return (
		<ActionIcon
			color={color ?? 'var(--color-primary)'}
			component={isLink ? 'a' : 'button'}
			data-disabled={disabled}
			disabled={disabled}
			href={isLink ? (props as LinkProps).href : undefined}
			loading={isLoading}
			onClick={isLink ? undefined : handleClick}
			variant="subtle"
		>
			{icon}
		</ActionIcon>
	);
}
