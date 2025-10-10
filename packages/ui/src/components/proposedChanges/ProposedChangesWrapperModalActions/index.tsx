/* * */

import { ButtonGroup, type ButtonGroupProps } from '@/components/buttons/ButtonGroup';
import { Permission } from '@tmlmobilidade/types';

/* * */

interface ProposedChangesWrapperModalActionsProps {
	approve: () => void
	permissions: Permission<unknown>[]
	reject: () => void
	submit: () => void
}

export function ProposedChangesWrapperModalActions({ approve, permissions, reject, submit }: ProposedChangesWrapperModalActionsProps) {
	//

	//
	// A. Setup Variables

	const buttons: ButtonGroupProps['buttons'] = [
		{ action: 'reject', label: 'Rejeitar', onclick: reject, variant: 'danger' },
		{ action: 'approve', label: 'Aprovar', onclick: approve, variant: 'secondary' },
		{ action: 'create', label: 'Submeter', onclick: submit, variant: 'primary' },
	];

	const visibleButtons = buttons.filter(btn =>
		permissions.find(p => p.action === btn.action),
	);
	//
	// B. Render Components

	return (
		<ButtonGroup buttons={visibleButtons} />
	);

	//
};
