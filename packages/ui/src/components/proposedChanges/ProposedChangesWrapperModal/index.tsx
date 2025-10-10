/* * */

import { ProposedChangesWrapperModalActions } from '@/components/proposedChanges/ProposedChangesWrapperModalActions';
import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { Modal } from '@mantine/core';
import { Permission } from '@tmlmobilidade/types';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalProps {
	actualValue: string
	inputName: string
	isOpen: boolean
	onClose: () => void
	permissions: Permission<unknown>[]
	relatedId: string
	scope: string
	status: string
}

/* * */

export function ProposedChangesWrapperModal({ actualValue, inputName, isOpen, onClose, permissions, relatedId, scope, status }: ProposedChangesWrapperModalProps) {
	//

	//
	// A. Setup variables

	const [proposedValue, setProposedValue] = useState<string | undefined>(undefined);

	//
	// B. Handler Actions

	const approve = async () => {
		//
	};

	const reject = () => {
		console.log('reject change');
	};
	const submit = () => {
		console.log('submit change');
		// const proposedChanges: ProposedChange<unknown> = {
		// 	curr_value: z.any(),
		// 	field: z.string(),
		// 	related_id: z.string(),
		// 	scope: scopeSchema,
		// 	status: statusSchema,
		// };
		// await fetchData(`${getAppConfig('auth', 'api_url')}/api/proposed-changes`, 'POST', proposedChanges);
	};

	//
	// C. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} title={`Proposta de alteração para: ${inputName}`}>
			<p>Related ID: {relatedId} : {scope}</p>
			<ProposedChangesWrapperModalContent actualValue={actualValue} proposedValue={proposedValue || ''} setProposedValue={setProposedValue} />
			<ProposedChangesWrapperModalActions approve={approve} permissions={permissions} reject={reject} submit={submit} />
		</Modal>
	);

	//
};
