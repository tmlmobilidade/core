'use client';

/* * */

import { Textarea as MantineTeaxtarea, TextareaProps as MantineTextareaProps } from '@mantine/core';

/* * */

export type TextareaProps = MantineTextareaProps;

/* * */

export function Teaxtarea({ classNames, ...props }: TextareaProps) {
	//

	//
	// A. Render components

	return <MantineTeaxtarea classNames={classNames} {...props} />;

	//
}
