'use client';

/* * */

import { Textarea as MantineTextarea, TextareaProps as MantineTextareaProps } from '@mantine/core';

/* * */

export type TextareaProps = MantineTextareaProps;

/* * */

export function Textarea({ classNames, ...props }: TextareaProps) {
	//

	//
	// A. Render components

	return <MantineTextarea classNames={classNames} {...props} />;

	//
}
