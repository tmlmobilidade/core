/* * */

import { ProposedChangesWrapperModalActions } from '@/components/proposedChanges/ProposedChangesWrapperModalActions';
import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { ProposedChangesWrapperModalMetadata } from '@/components/proposedChanges/ProposedChangesWrapperModalMetadata';
import { Modal } from '@mantine/core';
import { getAppConfig } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
import { useMeContext } from 'index';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalProps {
	actualValue: string
	inputName: string
	isNew: boolean
	isOpen: boolean
	onClose: () => void
	proposedChangesData?: ProposedChange<Stop>
	relatedId: string
	scope: string
}

/* * */

export function ProposedChangesWrapperModal({ actualValue, inputName, isNew, isOpen, onClose, proposedChangesData, relatedId, scope }: ProposedChangesWrapperModalProps) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];
	const [proposedValue, setProposedValue] = useState<string | undefined>(undefined);

	//
	// B. Handler Actions

	const approve = async () => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${proposedChangesData?._id}`,
				'PUT',
				{ status: 'approved' },
			);
		}
		catch (error) {
			console.error('Error approving proposed change:', error);
		}
	};

	const reject = async () => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${proposedChangesData?._id}`,
				'PUT',
				{ status: 'rejected' },
			);
		}
		catch (error) {
			console.error('Error rejecting proposed change:', error);
		}
	};
	const submit = async () => {
		const proposedChange: CreateProposedChangeDto<Stop> = {
			curr_value: proposedValue,
			field: inputName,
			related_id: relatedId,
			scope: scope,
			status: 'pending',
		};

		try {
			await fetchData(`${getAppConfig('auth', 'api_url')}/proposed-changes`, 'POST', proposedChange);
		}
		catch (error) {
			console.error('Error submitting proposed change:', error);
		}
	};

	//
	// C. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} title={`Proposta de alteração para: ${inputName}`}>
			<p>Related ID: {relatedId} : {scope}</p>
			{
				!isNew && <ProposedChangesWrapperModalMetadata />
			}
			<ProposedChangesWrapperModalContent actualValue={actualValue} proposedValue={proposedValue || ''} setProposedValue={setProposedValue} />
			<ProposedChangesWrapperModalActions approve={approve} isNew={isNew} permissions={permissions} reject={reject} submit={submit} />
		</Modal>
	);

	//
};
