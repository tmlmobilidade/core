'use client';

/* * */

import { Center, TextInputProps as MantineTextInputProps, rem, Text, TextInput, Tooltip } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

/* * */

export interface TextInputProps extends MantineTextInputProps {
	tooltip?: string
	validation?: RegExp
}

export default function Component({ classNames, error, validation, value, ...props }: TextInputProps) {
	//

	//
	// A. Setup variables

	const [isValid, setIsValid] = useState(true);

	//
	// B.Transform data

	useEffect(() => {
		if (!value || !error || !validation || value.toString().length === 0) {
			setIsValid(true);
		}
		else {
			const isValid = validation.test(value.toString());
			setIsValid(isValid);
		}
	}, [value]);

	//
	// C. Render components

	const renderTooltip = (tooltip?: string) => (
		<Tooltip
			label={tooltip}
			position="top-end"
			transitionProps={{ transition: 'pop-bottom-right' }}
			withArrow
		>
			<Text c="dimmed" component="div" style={{ cursor: 'help' }}>
				<Center>
					<IconInfoCircle stroke={1.5} style={{ height: rem(18), width: rem(18) }} />
				</Center>
			</Text>
		</Tooltip>
	);

	return (
		<TextInput
			classNames={classNames}
			error={error ? error : isValid ? '' : error}
			rightSection={props.tooltip && renderTooltip(props.tooltip)}
			value={value}
			{...props}
		/>
	);

	//
}
