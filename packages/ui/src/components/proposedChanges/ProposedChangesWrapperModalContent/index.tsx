/* * */

import { IconButton, TextInput } from '@/components';
import { ProposedChangesWrapperContentItemActions } from '@/components/proposedChanges//ProposedChangesWrapperContentItemActions';
import { ProposedChangesWrapperModalContentItem } from '@/components/proposedChanges/ProposedChangesWrapperModalContentItem';
import { useMeContext } from '@/contexts';
import { useProposedChangesContext } from '@/contexts/ProposedChanges.context';
import { IconPlus } from '@tabler/icons-react';
import { ProposedChange, Stop } from '@tmlmobilidade/types';
import { useState } from 'react';

import styles from './styles.module.css';

interface ProposedChangesWrapperModalContentProps {
	currentValue: string
	inputName?: string
	isNew: boolean
	proposedChanges: ProposedChange<Stop>[]
	relatedId?: string
	scope?: string
}

/* * */

export function ProposedChangesWrapperModalContent({ currentValue, inputName, isNew, proposedChanges, relatedId, scope }: ProposedChangesWrapperModalContentProps) {
	//

	//
	// A. Setup Variables

	const proposedChangesContext = useProposedChangesContext();
	const meContext = useMeContext();
	const [addingNew, setAddingNew] = useState(false);
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];
	const [proposedChangeData, setProposedChangeData] = useState<ProposedChange<Stop> | undefined>(undefined);

	//
	// B. Handler Actions

	const handleSubmit = () => {
		if (proposedChangeData && relatedId && scope) {
			proposedChangesContext.actions.submit({
				curr_value: proposedChangeData.curr_value,
				field: proposedChangeData.field,
				inputName: inputName || '',
				related_id: relatedId,
				scope,
			});
			setAddingNew(false);
			setProposedChangeData(undefined);
		}
	};

	//
	// C. Render Components

	return (
		<div>
			<TextInput label="Valor atual: " value={currentValue} disabled />
			<br />
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
						<div key={proposedChange?._id} className={styles.proposedChangeItemWrapper}>
							<ProposedChangesWrapperModalContentItem proposedChangeData={proposedChange} setProposedChange={setProposedChangeData} />
							<ProposedChangesWrapperContentItemActions approve={() => proposedChangesContext.actions.approve?.(proposedChange?._id || '')} isNew={isNew} permissions={permissions} reject={() => proposedChangesContext.actions.reject?.(proposedChange?._id || '')} submit={handleSubmit} />
						</div>
					))}
					{addingNew && (
						<div className={styles.proposedChangeItemWrapper} onClick={() => setAddingNew(false)}>
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
