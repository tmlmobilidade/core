/* * */

import { TextInput } from '@/components';
import { ProposedChangesWrapperContentItemActions } from '@/components/proposedChanges//ProposedChangesWrapperContentItemActions';
import { ProposedChangesWrapperModalContentItem } from '@/components/proposedChanges/ProposedChangesWrapperModalContentItem';
import { useMeContext } from '@/contexts';
import { getAppConfig } from '@tmlmobilidade/lib';
import { CreateProposedChangeDto, ProposedChange, Stop } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';
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

	const meContext = useMeContext();
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];
	const [proposedChangeData, setProposedChangeData] = useState<ProposedChange<Stop> | undefined>(undefined);

	//
	// B. Handler Actions

	const approve = async (id: string) => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`,
				'PUT',
				{ status: 'approved' },
			);
		}
		catch (error) {
			console.error('Error approving proposed change:', error);
		}
	};

	const reject = async (id: string) => {
		try {
			await fetchData(
				`${getAppConfig('auth', 'api_url')}/proposed-changes/${id}`,
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
			curr_value: proposedChangeData?.curr_value,
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
		<div>
			<TextInput label="Valor atual: " value={currentValue} disabled />
			<br />
			<p>Valores propostos: </p>
			{proposedChanges && proposedChanges.length > 0 ? (
				proposedChanges.map(proposedChange => (
					<div key={proposedChange?._id} className={styles.proposedChangeItemWrapper}>
						<ProposedChangesWrapperModalContentItem proposedChangeData={proposedChange} setProposedChange={setProposedChangeData} />
						<ProposedChangesWrapperContentItemActions approve={() => approve(proposedChange?._id || '')} isNew={isNew} permissions={permissions} reject={() => reject(proposedChange?._id || '')} submit={submit} />

					</div>
				))
			) : (
				<div className={styles.proposedChangeItemWrapper}>
					<ProposedChangesWrapperModalContentItem proposedChangeData={undefined} setProposedChange={setProposedChangeData} />
					<ProposedChangesWrapperContentItemActions approve={() => console.log} isNew={isNew} permissions={permissions} reject={() => console.log()} submit={submit} />
				</div>
			)}
		</div>
	);
};
