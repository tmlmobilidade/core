/* * */

import { ButtonGroup, type ButtonGroupProps } from '@/components/buttons/ButtonGroup';

/* * */

interface ProposedChangesWrapperModalActionsProps {
	approve: () => void
	reject: () => void
	submit: () => void
}

export function ProposedChangesWrapperModalActions({ approve, reject, submit }: ProposedChangesWrapperModalActionsProps) {
	//

	//
	// A. Setup Variables

	const buttons: ButtonGroupProps['buttons'] = [
		{ label: 'Rejeitar', onclick: reject, variant: 'danger' },
		{ label: 'Aprovar', onclick: approve, variant: 'secondary' },
		{ label: 'Submeter', onclick: submit, variant: 'primary' },
	];
	//
	// B. Render Components

	return (
		<ButtonGroup buttons={buttons} />
	);

	//
};
