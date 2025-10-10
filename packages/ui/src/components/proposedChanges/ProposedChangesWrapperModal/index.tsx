/* * */

import { ProposedChangesWrapperModalActions } from '@/components/proposedChanges/ProposedChangesWrapperModalActions';
import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { Modal } from '@mantine/core';
import { useMeContext } from 'index';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalProps {
	actualValue: string
	inputName: string
	isNew: boolean
	isOpen: boolean
	onClose: () => void
	relatedId: string
	scope: string
}

/* * */

export function ProposedChangesWrapperModal({ actualValue, inputName, isNew, isOpen, onClose, relatedId, scope }: ProposedChangesWrapperModalProps) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];
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
			{
				// if has already create proposed changes, show metadata
			}
			<ProposedChangesWrapperModalContent actualValue={actualValue} proposedValue={proposedValue || ''} setProposedValue={setProposedValue} />
			<ProposedChangesWrapperModalActions approve={approve} isNew={false} permissions={permissions} reject={reject} submit={submit} />
		</Modal>
	);

	//
};
