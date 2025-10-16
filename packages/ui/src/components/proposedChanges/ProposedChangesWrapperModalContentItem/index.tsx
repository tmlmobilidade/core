/* * */

import { ProposedChangesInteractiveInput } from '@/components/proposedChanges/ProposedChangesClonedInput';
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { CreateProposedChangeDto, ProposedChange } from '@tmlmobilidade/types';
import React from 'react';

/* * */

interface ProposedChangesWrapperModalContentProps<S extends ScopeKey> {
	originalInput: React.ReactElement<{
		disabled?: boolean
		onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
		value?: string
	}>
	proposedChangeData?: ProposedChange<ScopeEntityMap[S]>
	setProposedChange: (value: CreateProposedChangeDto<ScopeEntityMap[S]> | undefined) => void
}

/* * */

export function ProposedChangesWrapperModalContentItem<S extends ScopeKey>({ originalInput, proposedChangeData, setProposedChange }: ProposedChangesWrapperModalContentProps<S>) {
	//

	//
	// A. Render Components

	return (
		<ProposedChangesInteractiveInput originalInput={originalInput} proposedChangeData={proposedChangeData} setProposedChange={setProposedChange} />
	);

	//
}
