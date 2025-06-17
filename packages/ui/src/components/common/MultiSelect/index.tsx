import { CheckIcon, Combobox, Group, Pill, PillsInput, useCombobox } from '@mantine/core';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

interface DataItem {
	icon?: React.ReactNode
	label: string
	value: string
}

interface MultiSelectProps {
	className?: string
	data: DataItem[]
	description?: string
	error?: string
	fullWidth?: boolean
	label?: string
	maxHeight?: number
	onChange?: (selected: string[]) => void
	searchable?: boolean
	selected: string[]
}

export default function MultiSelect({
	data,
	description,
	error,
	label,
	maxHeight,
	onChange,
	searchable = true,
	selected,
}: MultiSelectProps) {
	const combobox = useCombobox({
		onDropdownClose: () => combobox.resetSelectedOption(),
		onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
	});

	const [search, setSearch] = useState('');
	const [value, setValue] = useState<DataItem[]>(() => {
		// Initialize with DataItems that match the selected values
		return data.filter(item => selected.includes(item.value));
	});

	// Sync internal state with selected prop
	useEffect(() => {
		// Convert selected values to DataItems
		const selectedItems = data.filter(item => selected.includes(item.value));
		setValue(selectedItems);
	}, [selected, data]);

	const handleValueSelect = (selectedItem: DataItem) => {
		const newValue = value.some(item => item.value === selectedItem.value)
			? value.filter(item => item.value !== selectedItem.value)
			: [...value, selectedItem];

		setValue(newValue);
		onChange?.(newValue.map(item => item.value));
	};

	const handleOptionSubmit = (optionValue: string) => {
		const selectedItem = data.find(item => item.value === optionValue);
		if (selectedItem) {
			handleValueSelect(selectedItem);
		}
	};

	const handleValueRemove = (itemToRemove: DataItem) => {
		const newValue = value.filter(item => item.value !== itemToRemove.value);
		setValue(newValue);
		onChange?.(newValue.map(item => item.value));
	};

	const values = value.map(item => (
		<Pill key={item.value} className={styles.pill} onRemove={() => handleValueRemove(item)} withRemoveButton>
			{item.icon && <span style={{ marginRight: '0.25rem' }}>{item.icon}</span>}
			{item.label}
		</Pill>
	));

	const filteredData = searchable
		? data.filter(item =>
			item.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(search.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')),
		)
		: data;

	const options = filteredData.map((item) => {
		const isSelected = value.some(selectedItem => selectedItem.value === item.value);
		return (
			<Combobox.Option
				key={item.value}
				active={isSelected}
				onClick={() => handleValueSelect(item)}
				value={item.value}
			>
				<Group gap="sm">
					{isSelected ? <CheckIcon size={12} /> : null}
					{item.icon && <span>{item.icon}</span>}
					<span>{item.label}</span>
				</Group>
			</Combobox.Option>
		);
	});

	return (

		<Combobox
			onOptionSubmit={handleOptionSubmit}
			store={combobox}
			withinPortal={false}
			classNames={{
				dropdown: styles.dropdown,
				option: styles.option,
			}}
		>
			<Combobox.DropdownTarget>
				<PillsInput
					data-focus={combobox.dropdownOpened}
					description={description}
					error={error}
					label={label}
					onClick={() => combobox.openDropdown()}
					classNames={{
						description: styles.description,
						error: styles.error,
						input: styles.input,
						label: styles.label,
					}}
				>
					<Pill.Group>
						{values}

						<Combobox.EventsTarget>
							<PillsInput.Field
								onBlur={() => combobox.closeDropdown()}
								onFocus={() => combobox.openDropdown()}
								placeholder={searchable ? 'Search values' : 'Select values'}
								readOnly={!searchable}
								value={searchable ? search : ''}
								onChange={(event) => {
									if (searchable) {
										combobox.updateSelectedOptionIndex();
										setSearch(event.currentTarget.value);
									}
								}}
								onKeyDown={(event) => {
									if (event.key === 'Backspace' && search.length === 0 && value.length > 0) {
										event.preventDefault();
										const lastItem = value[value.length - 1];
										if (lastItem) {
											handleValueRemove(lastItem);
										}
									}
								}}
							/>
						</Combobox.EventsTarget>
					</Pill.Group>
				</PillsInput>
			</Combobox.DropdownTarget>

			<Combobox.Dropdown className={styles.dropdownWrapper} style={{ maxHeight }}>
				<Combobox.Options>
					{options.length > 0 ? options : <Combobox.Empty>Nothing found...</Combobox.Empty>}
				</Combobox.Options>
			</Combobox.Dropdown>
		</Combobox>
	);
}
