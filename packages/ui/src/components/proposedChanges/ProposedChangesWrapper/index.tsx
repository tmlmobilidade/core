/* * */

import { ProposedChangesWrapperModal } from '@/components/proposedChanges/ProposedChangesWrapperModal';
import { useProposedChangesContext } from '@/contexts';
import { ScopeKey } from '@/contexts/ProposedChanges.context';
import { IconInfoCircle } from '@tabler/icons-react';
import { Status } from '@tmlmobilidade/types';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ProposedChangesWrapperProps<S extends ScopeKey> {
	children: React.ReactNode
	currentValue: string
	inputName: string
	label: string
	relatedId: string
	scope: S
}

/* * */

export function ProposedChangesWrapper<S extends ScopeKey>({ children, currentValue, inputName, label, relatedId, scope }: ProposedChangesWrapperProps<S>) {
	//

	//
	// A. Setup variables

	const proposedChangesContext = useProposedChangesContext(scope);
	const [opened, setOpened] = useState(false);
	const [isNew, setIsNew] = useState(true);
	const [status, setStatus] = useState<'none' | Status>('none');

	const proposedChangesForCurrentStop = proposedChangesContext.data.allProposedChangesByRelatedId;
	const colorLevel = status === 'pending' ? 'var(	--color-status-warning-primary)' : status === 'approved' ? ' var(--color-status-success-primary)' : status === 'rejected' ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)';

	useEffect(() => {
		setIsNew(proposedChangesForCurrentStop.length === 0);
	}, [proposedChangesForCurrentStop]);

	useEffect(() => {
		const hasPending = proposedChangesForCurrentStop?.find(pc => pc?.status === 'pending');
		setStatus(hasPending ? 'pending' : 'none');
	}, [proposedChangesContext.data.allProposedChangesByRelatedId]);

	//
	// B. Render Components

	return (
		<div>
			<div className={styles.labelWrapper}>
				{label}
				<IconInfoCircle color={colorLevel} onClick={() => setOpened(!opened)} size={18} />
				<ProposedChangesWrapperModal currentValue={currentValue} inputName={inputName} isNew={isNew} isOpen={opened} onClose={() => setOpened(!opened)} proposedChangesData={proposedChangesForCurrentStop} relatedId={relatedId} scope={scope} />
			</div>
			{children}
		</div>
	);

	//
};
