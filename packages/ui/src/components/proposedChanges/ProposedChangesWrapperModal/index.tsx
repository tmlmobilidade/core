/* * */

import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { Modal } from '@mantine/core';
import { ProposedChange } from '@tmlmobilidade/types';

/* * */

interface ProposedChangesWrapperModalProps<S extends ScopeKey> {
	currentValue: string
	inputName: string
	isNew: boolean
	isOpen: boolean
	onClose: () => void
	proposedChangesData?: ProposedChange<ScopeEntityMap[S]>[]
	relatedId: string
	scope: S
}

/* * */

export function ProposedChangesWrapperModal<S extends ScopeKey>({ currentValue, inputName, isNew, isOpen, onClose, proposedChangesData, relatedId, scope }: ProposedChangesWrapperModalProps<S>) {
	//

	//
	// A. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} title={`Proposta de alteração para: ${inputName}`}>
			<ProposedChangesWrapperModalContent currentValue={currentValue} inputName={inputName} isNew={isNew} proposedChanges={proposedChangesData || []} relatedId={relatedId} scope={scope} />
		</Modal>
	);

	//
};
