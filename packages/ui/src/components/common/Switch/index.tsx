'use client';

/* * */

import { Switch as MantineSwitch, SwitchProps as MantineSwitchProps } from '@mantine/core';

import styles from './styles.module.css';

type SwitchProps = MantineSwitchProps;

export default function Switch({ classNames, ...props }: SwitchProps) {
	return <MantineSwitch classNames={{ ...styles, ...classNames }} {...props} />;
}
