/* * */

import { ProposedChangesWrapperModalActions } from '@/components/proposedChanges/ProposedChangesWrapperModalActions';
import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { Modal } from '@mantine/core';
import { useEffect, useState } from 'react';

/* * */

interface ProposedChangesWrapperModalProps {
	actualValue: string
	inputName: string
	isOpen: boolean
	onClose: () => void
	scope: string
	status: string
}

/* * */

export function ProposedChangesWrapperModal({ actualValue, inputName, isOpen, onClose, status }: ProposedChangesWrapperModalProps) {
	//

	//
	// A. Setup variables

	const [proposedValue, setProposedValue] = useState<string>('');

	//
	// B. Handler Actions

	useEffect(() => {
		console.log('value changes', proposedValue);
	}, [proposedValue]);

	const approve = async () => {
		console.log('approve change');
	};

	const reject = () => {
		console.log('reject change');
	};
	const submit = () => {
		console.log('submit change');
	};

	//
	// C. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} title={`Proposta de alteração para: ${inputName}`}>
			<ProposedChangesWrapperModalContent actualValue={actualValue} proposedValue={proposedValue} setProposedValue={setProposedValue} />
			<ProposedChangesWrapperModalActions approve={approve} reject={reject} submit={submit} />
		</Modal>
	);

	//
};
