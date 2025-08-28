'use client';

/* * */

import { Pill } from '@mantine/core';
import { IconCheck, IconPlus, IconX } from '@tabler/icons-react';
import { ExactlyOne } from '@tmlmobilidade/types';
import { Fragment, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface DataItem {
	icon?: React.ReactNode
	label: string
	value: string
}

interface PillGroupBaseProps {
	data: DataItem[] | string[]
	onChange?: (value: string[]) => void
	selected?: string[]
}

type PillGroupProps = PillGroupBaseProps;

export function PillGroup({ data, onChange, selected }: PillGroupProps) {
	//

	const preparedData = useMemo(() => {
		return data.map(item => (typeof item === 'string' ? { label: item, value: item } : item));
	}, [data]);

	//
	// A. Render components

	return (
		<Pill.Group>
			{preparedData.map(item => (
				<Pill
					key={item.value}
					classNames={{
						label: styles.label,
						root: styles.pill,
					}}
					removeButtonProps={{
						icon: selected?.includes(item.value) ? <IconX size={16} /> : <IconPlus size={16} />,
						onClick: () => {
							if (selected?.includes(item.value)) {
								onChange?.(selected.filter(value => value !== item.value));
							}
							else {
								onChange?.([...(selected ?? []), item.value]);
							}
						},
					}}
					withRemoveButton
				>
					{selected?.includes(item.value) && <IconCheck size={16} />}
					{item.icon && <span style={{ marginRight: '0.25rem' }}>{item.icon}</span>}
					{item.label}
				</Pill>
			))}
		</Pill.Group>
	);

	//
}
