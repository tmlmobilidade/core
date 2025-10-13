/* * */

import { ButtonGroup, type ButtonGroupProps } from '@/components/buttons/ButtonGroup';
import { IconCheck, IconPlus, IconTrash } from '@tabler/icons-react';
import { Permissions } from '@tmlmobilidade/lib';
import { Permission } from '@tmlmobilidade/types';

/* * */

interface ProposedChangesWrapperContentItemActionsProps {
	approve: () => void
	isNew: boolean
	permissions: Permission<unknown>[]
	reject: () => void
	submit: () => void
}

export function ProposedChangesWrapperContentItemActions({ approve, isNew, permissions, reject, submit }: ProposedChangesWrapperContentItemActionsProps) {
	//

	//
	// A. Setup Variables

	const buttons: ButtonGroupProps['buttons'] = [
		{ action: Permissions.proposed_changes.actions.reject, icon: <IconTrash size={16} />, onclick: reject, variant: 'danger' },
		{ action: Permissions.proposed_changes.actions.approve, icon: <IconCheck size={16} />, onclick: approve, variant: 'secondary' },
		{ action: Permissions.proposed_changes.actions.create, icon: <IconPlus size={16} />, onclick: submit, variant: 'primary' },
	];

	//
	// B. Transform data

	const visibleButtons = isNew ? buttons.filter(btn => btn.action === 'create') : buttons.filter(btn => permissions.find(p => p.action === btn.action));

	//
	// C. Render Components

	return (
		<ButtonGroup afterInput={true} buttons={visibleButtons} />
	);

	//
};
