'use client';

/* * */

import { TextareaProps as MantineTextareaProps, Textarea } from '@mantine/core';

/* * */

export type TextAreaProps = MantineTextareaProps;

export default function Component({ classNames, ...props }: TextAreaProps) {
	//

	//
	// A. Render components

	return <Textarea classNames={classNames} {...props} />;
}
