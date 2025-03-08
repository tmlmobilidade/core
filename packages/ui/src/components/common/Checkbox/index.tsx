'use client';

/* * */

import { Checkbox as MantineCheckbox, CheckboxProps as MantineCheckboxProps } from '@mantine/core';

/* * */

import styles from './styles.module.css';

export type CheckboxProps = MantineCheckboxProps;

export default function Checkbox(props: CheckboxProps) {
	return <MantineCheckbox classNames={{ ...styles, ...props.classNames }} {...props} />;
}
