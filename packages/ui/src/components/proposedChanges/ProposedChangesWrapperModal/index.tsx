/* * */

import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { ProposedChangesWrapperModalMetadata } from '@/components/proposedChanges/ProposedChangesWrapperModalMetadata';
import { Modal } from '@mantine/core';
import { ProposedChange, Stop } from '@tmlmobilidade/types';

/* * */

interface ProposedChangesWrapperModalProps {
	currentValue: string
	inputName: string
	isNew: boolean
	isOpen: boolean
	onClose: () => void
	proposedChangesData?: ProposedChange<Stop>[]
	relatedId: string
	scope: string
}

/* * */

export function ProposedChangesWrapperModal({ currentValue, inputName, isNew, isOpen, onClose, proposedChangesData, relatedId, scope }: ProposedChangesWrapperModalProps) {
	//

	//
	// A. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} title={`Proposta de alteração para: ${inputName}`}>
			<p>Related ID: {relatedId} : {scope}</p>
			{
				!isNew && <ProposedChangesWrapperModalMetadata />
			}
			<ProposedChangesWrapperModalContent currentValue={currentValue} inputName={inputName} isNew={isNew} proposedChanges={proposedChangesData || []} relatedId={relatedId} scope={scope} />
		</Modal>
	);

	//
};
