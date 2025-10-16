/* * */

import { ProposedChangesWrapperModalContent } from '@/components/proposedChanges/ProposedChangesWrapperModalContent';
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { Modal } from '@mantine/core';
import { ProposedChange } from '@tmlmobilidade/types';

/* * */

interface ProposedChangesWrapperModalProps<S extends ScopeKey> {
	inputName: string
	isNew: boolean
	isOpen: boolean
	onClose: () => void
	originalInput: React.ReactElement<{ disabled?: boolean }>
	proposedChangesData?: ProposedChange<ScopeEntityMap[S]>[]
	relatedId: string
	scope: S
}

/* * */

export function ProposedChangesWrapperModal<S extends ScopeKey>({ inputName, isNew, isOpen, onClose, originalInput, proposedChangesData, relatedId, scope }: ProposedChangesWrapperModalProps<S>) {
	//

	//
	// A. Render Components

	return (
		<Modal onClose={onClose} opened={isOpen} size="xl" title={`Proposta de alteração para: ${inputName}`}>
			<ProposedChangesWrapperModalContent inputName={inputName} isNew={isNew} originalInput={originalInput} proposedChanges={proposedChangesData || []} relatedId={relatedId} scope={scope} />
		</Modal>
	);

	//
};
