/* * */

import { Button } from '@/components';
import { ProposedChangesWrapperContentItemActions } from '@/components/proposedChanges/ProposedChangesWrapperContentItemActions';
import { ProposedChangesWrapperModalContentHeader } from '@/components/proposedChanges/ProposedChangesWrapperModalContentHeader';
import { ProposedChangesWrapperModalContentItem } from '@/components/proposedChanges/ProposedChangesWrapperModalContentItem';
import { ProposedChangesWrapperModalMetadata } from '@/components/proposedChanges/ProposedChangesWrapperModalMetadata';
import { useMeContext } from '@/contexts';
import { ScopeEntityMap, ScopeKey, useProposedChangesContext } from '@/contexts/ProposedChanges.context';
import { CreateProposedChangeDto, ProposedChange } from '@tmlmobilidade/types';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ProposedChangesWrapperModalContentProps<S extends ScopeKey> {
	inputName: string
	isNew: boolean
	originalInput: React.ReactElement<{ disabled?: boolean }>
	proposedChanges: ProposedChange<ScopeEntityMap[S]>[]
	relatedId: string
	scope: S
}

/* * */

export function ProposedChangesWrapperModalContent<S extends ScopeKey>({ inputName, isNew, originalInput, proposedChanges, relatedId, scope }: ProposedChangesWrapperModalContentProps<S>) {
	//

	//
	// A. Setup Variables

	const proposedChangesContext = useProposedChangesContext(scope);
	const meContext = useMeContext();
	const [addingNew, setAddingNew] = useState(false);
	const [proposedChangeData, setProposedChangeData] = useState<CreateProposedChangeDto<ScopeEntityMap[S]> | undefined>(undefined);
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];

	//
	// B. Handler Actions

	const handleSubmit = async () => {
		if (!proposedChangeData) return;

		await proposedChangesContext.actions.submit({
			...proposedChangeData,
			field: inputName,
			related_id: relatedId,
			scope: scope,
			status: 'pending',
		});

		setAddingNew(false);
		setProposedChangeData(undefined);
	};

	const handleNew = () => {
		setAddingNew(true);
		setProposedChangeData(undefined);
	};

	//
	// C. Render Components
	return (
		<>

			<ProposedChangesWrapperModalContentHeader originalInput={originalInput} />

			<div className={styles.modalContentHeaderWrapper}>
				<span>Valores Propostos</span>
				<Button label="Adicionar"onClick={handleNew} />
			</div>

			{addingNew && (
				<div className={styles.proposedChangeItemWrapper}>
					<ProposedChangesWrapperModalContentItem originalInput={originalInput} proposedChangeData={undefined} setProposedChange={setProposedChangeData} />
					<ProposedChangesWrapperContentItemActions isNew={true} permissions={permissions} submit={handleSubmit} />
				</div>
			)}

			{proposedChanges.map(proposedChange => (
				<div key={proposedChange?._id} className={styles.proposedChangeItemWrapper}>
					<ProposedChangesWrapperModalMetadata proposedChangeData={proposedChange} />
					<ProposedChangesWrapperModalContentItem originalInput={originalInput} proposedChangeData={proposedChange} setProposedChange={setProposedChangeData} />
					<ProposedChangesWrapperContentItemActions approve={() => proposedChangesContext.actions.approve?.(proposedChange?._id || '')} isNew={isNew} permissions={permissions} reject={() => proposedChangesContext.actions.reject?.(proposedChange?._id || '')} status={proposedChange.status} submit={handleSubmit} />
				</div>
			))}

			{!addingNew && proposedChanges.length === 0 && (
				<div className={styles.proposedChangeItemWrapper}>
					<p>Nenhum valor proposto para este campo.</p>
				</div>
			)}
		</>
	);
};
