'use client';

/* * */

import { ActionIcon as MantineActionIcon, TextInput as MantineTextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

export interface SearchInputProps {
	onChange: (value: string) => void
	value?: null | string
}

/* * */

export function SearchInput({ onChange, value }: SearchInputProps) {
	//

	//
	// A. Setup variables

	const [isInUse, setIsInUse] = useState(false);

	//
	// A. Handle actions

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange(event.target.value);
	};

	const handleClear = () => {
		if (!onChange) return;
		onChange('');
		setIsInUse(false);
	};

	const handleFocus = () => {
		setIsInUse(true);
	};

	const handleBlur = () => {
		if (value?.length) return;
		setIsInUse(false);
	};

	//
	// B. Render components

	return (
		<MantineTextInput
			classNames={{ root: styles.override }}
			data-in-use={isInUse}
			leftSection={<IconSearch size={20} />}
			onBlur={handleBlur}
			onChange={handleChange}
			onFocus={handleFocus}
			placeholder="Pesquisar..."
			value={value ?? ''}
			rightSection={
				(typeof value === 'string' && value.length > 0) && (
					<MantineActionIcon color="var(--color-system-text-300)" onClick={handleClear} variant="transparent">
						<IconX size={20} />
					</MantineActionIcon>
				)
			}
		/>
	);

	//
}
