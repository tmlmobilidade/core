'use client';

/* * */

import { PasswordInput as MantinePasswordInput, PasswordInputProps as MantinePasswordInputProps } from '@mantine/core';
import { IconEye, IconEyeClosed } from '@tabler/icons-react';

/* * */

export function PasswordInput({ classNames, error, value, ...props }: MantinePasswordInputProps) {
	return (
		<MantinePasswordInput
			classNames={classNames}
			error={error}
			value={value}
			visibilityToggleIcon={({ reveal }) => reveal ? <IconEye size={18} /> : <IconEyeClosed size={18} />}
			{...props}
		/>
	);
}
