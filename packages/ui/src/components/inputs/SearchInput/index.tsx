'use client';

/* * */

import { ActionIcon as MantineActionIcon, TextInput as MantineTextInput } from '@mantine/core';
import { IconSearch, IconX } from '@tabler/icons-react';

/* * */

export interface SearchInputProps {
	onChange: (value: string) => void
	value?: null | string
}

/* * */

export function SearchInput({ onChange, value }: SearchInputProps) {
	//

	//
	// A.Handle actions

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!onChange) return;
		onChange(event.target.value);
	};

	const handleClear = () => {
		if (!onChange) return;
		onChange('');
	};

	//
	// B. Render components

	return (
		<MantineTextInput
			leftSection={<IconSearch size={20} />}
			onChange={handleChange}
			placeholder="Pesquisar..."
			value={value ?? ''}
			rightSection={(
				<MantineActionIcon color="var(--color-system-text-200)" onClick={handleClear} variant="transparent">
					<IconX size={20} />
				</MantineActionIcon>
			)}
		/>
	);

	//
}
