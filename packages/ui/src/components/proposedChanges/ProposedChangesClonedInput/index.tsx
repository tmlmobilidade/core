/* eslint-disable @typescript-eslint/no-explicit-any */
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { CreateProposedChangeDto, ProposedChange } from '@tmlmobilidade/types';
import React from 'react';

interface ProposedChangesInteractiveInputProps<S extends ScopeKey> {
	originalInput: React.ReactElement<any>
	proposedChangeData?: ProposedChange<ScopeEntityMap[S]>
	setProposedChange: (value: CreateProposedChangeDto<ScopeEntityMap[S]> | undefined) => void
}

export function ProposedChangesInteractiveInput<S extends ScopeKey>({
	originalInput,
	proposedChangeData,
	setProposedChange,
}: ProposedChangesInteractiveInputProps<S>) {
	const handleChange = (value: any) => {
		setProposedChange({
			...proposedChangeData,
			curr_value: value,
		} as CreateProposedChangeDto<ScopeEntityMap[S]>);
	};

	// detect component type name
	const inputName
    = (originalInput.type as any)?.displayName
      || (originalInput.type as any)?.name
      || '';
	const lc = inputName.toLowerCase();

	const isCheckbox = lc.includes('checkbox') || lc.includes('switch');
	const isCombobox = lc.includes('combobox') || lc.includes('select');
	const isDateTime = lc.includes('datetime') || lc.includes('date');

	const origOnChange = originalInput.props?.onChange;
	const newProps: any = {};

	if (proposedChangeData) {
		// Show the proposed value, disable input
		newProps.disabled = true;

		if (isCheckbox) {
			newProps.checked = Boolean(proposedChangeData.curr_value);
			newProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
				handleChange(e.currentTarget.checked);
		}
		else if (isCombobox) {
			newProps.value = proposedChangeData.curr_value ?? '';
			newProps.onChange = (v: any) => handleChange(v);
		}
		else if (isDateTime) {
			newProps.value = proposedChangeData.curr_value
				? new Date(
					typeof proposedChangeData.curr_value === 'string'
					|| typeof proposedChangeData.curr_value === 'number'
					|| proposedChangeData.curr_value instanceof Date
						? proposedChangeData.curr_value
						: '',
				)
				: null;
			newProps.onChange = (d: Date | null) => handleChange(d);
		}
		else {
			newProps.value = proposedChangeData.curr_value?.toString() ?? '';
			newProps.onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
				handleChange(e.currentTarget.value);
		}
	}
	else {
		// No proposedChangeData — input is interactive, but we wrap onChange to capture
		if (isCheckbox) {
			newProps.onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
				handleChange(e.currentTarget.checked);
				origOnChange?.(e);
			};
			// do not override checked
		}
		else if (isCombobox) {
			newProps.onChange = (v: any) => {
				handleChange(v);
				origOnChange?.(v);
			};
			// do not override value
		}
		else if (isDateTime) {
			newProps.onChange = (d: Date | null) => {
				handleChange(d);
				origOnChange?.(d);
			};
		}
		else {
			newProps.onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
				handleChange(e.currentTarget.value);
				origOnChange?.(e);
			};
			// do not override value
		}
		// preserve disabled prop from original if any
		if (originalInput.props.disabled !== undefined) {
			newProps.disabled = originalInput.props.disabled;
		}
	}

	const cloned = React.cloneElement(originalInput, newProps);
	return <>{cloned}</>;
}
