'use client';

/* * */

import { Slider as MantineSlider, SliderProps as MantineSliderProps } from '@mantine/core';

import styles from './styles.module.css';

type SliderProps = MantineSliderProps;

export default function Slider({ classNames, ...props }: SliderProps) {
	return <MantineSlider classNames={{ ...styles, ...classNames }} {...props} />;
}
