/* * */

import { IconButton, TextInput } from '@/components';
import { ProposedChangesWrapperContentItemActions } from '@/components/proposedChanges/ProposedChangesWrapperContentItemActions';
import { ProposedChangesWrapperModalContentItem } from '@/components/proposedChanges/ProposedChangesWrapperModalContentItem';
import { ProposedChangesWrapperModalMetadata } from '@/components/proposedChanges/ProposedChangesWrapperModalMetadata';
import { useMeContext } from '@/contexts';
import { ScopeEntityMap, ScopeKey, useProposedChangesContext } from '@/contexts/ProposedChanges.context';
import { IconPlus } from '@tabler/icons-react';
import { ProposedChange } from '@tmlmobilidade/types';
import { useState } from 'react';

import styles from './styles.module.css';

interface ProposedChangesWrapperModalContentProps<S extends ScopeKey> {
	currentValue: string
	inputName: string
	isNew: boolean
	proposedChanges: ProposedChange<ScopeEntityMap[S]>[]
	relatedId: string
	scope: S
}

/* * */

export function ProposedChangesWrapperModalContent<S extends ScopeKey>({ currentValue, inputName, isNew, proposedChanges, relatedId, scope }: ProposedChangesWrapperModalContentProps<S>) {
	//

	//
	// A. Setup Variables

	const proposedChangesContext = useProposedChangesContext(scope);
	const meContext = useMeContext();
	const [addingNew, setAddingNew] = useState(false);
	const [proposedChangeData, setProposedChangeData] = useState<ProposedChange<ScopeEntityMap[S]> | undefined>(undefined);
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];

	//
	// B. Handler Actions

	const handleSubmit = async () => {
		if (!proposedChangeData) return;

		await proposedChangesContext.actions.submit({
			curr_value: proposedChangeData.curr_value,
			field: inputName,
			related_id: relatedId,
			scope: scope,
			status: undefined,
		});

		setAddingNew(false);
		setProposedChangeData(undefined);
	};

	//
	// C. Render Components

	return (
		<div>
			<TextInput label="Valor atual: " value={currentValue} disabled />
			<span>
				Valores Propostos:
				{proposedChanges && proposedChanges.length > 0 && (
					<IconButton
						icon={<IconPlus size={12} />}
						onClick={() => {
							setAddingNew(true);
							setProposedChangeData(undefined);
						}}
					/>
				)}
			</span>

			{proposedChanges && proposedChanges.length > 0 ? (
				<>
					{proposedChanges.map(proposedChange => (
						<>
							<ProposedChangesWrapperModalMetadata proposedChangeData={proposedChange} />
							<div key={proposedChange?._id} className={styles.proposedChangeItemWrapper}>
								<ProposedChangesWrapperModalContentItem proposedChangeData={proposedChange} setProposedChange={setProposedChangeData} />
								<ProposedChangesWrapperContentItemActions approve={() => proposedChangesContext.actions.approve?.(proposedChange?._id || '')} isNew={isNew} permissions={permissions} reject={() => proposedChangesContext.actions.reject?.(proposedChange?._id || '')} submit={handleSubmit} />
							</div>
						</>
					))}
					{addingNew && (
						<div className={styles.proposedChangeItemWrapper}>
							<ProposedChangesWrapperModalContentItem proposedChangeData={undefined} setProposedChange={setProposedChangeData} />
							<ProposedChangesWrapperContentItemActions isNew={true} permissions={permissions} submit={handleSubmit} />
						</div>
					)}
				</>
			) : (
				<div className={styles.proposedChangeItemWrapper}>
					<ProposedChangesWrapperModalContentItem proposedChangeData={undefined} setProposedChange={setProposedChangeData} />
					<ProposedChangesWrapperContentItemActions isNew={isNew} permissions={permissions} submit={handleSubmit} />
				</div>
			)}
		</div>
	);
};
