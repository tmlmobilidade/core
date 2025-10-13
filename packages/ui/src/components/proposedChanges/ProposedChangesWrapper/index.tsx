/* * */

import { ProposedChangesWrapperModal } from '@/components/proposedChanges/ProposedChangesWrapperModal';
import { IconInfoCircle } from '@tabler/icons-react';
import { getAppConfig } from '@tmlmobilidade/lib';
import { ProposedChange, Status, Stop } from '@tmlmobilidade/types';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface ProposedChangesWrapperProps {
	children: React.ReactNode
	currentValue: string
	inputName: string
	label: string
	relatedId: string
	scope: string
}

/* * */

export function ProposedChangesWrapper({ children, currentValue, inputName, label, relatedId, scope }: ProposedChangesWrapperProps) {
	//

	//
	// A. Setup variables

	const { data: allProposedChanges } = useSWR<ProposedChange<Stop>[]>(`${getAppConfig('auth', 'api_url')}/proposed-changes`);
	const [opened, setOpened] = useState(false);
	const [isNew, setIsNew] = useState(true);
	const [data, setData] = useState<ProposedChange<Stop>[] | undefined>(undefined);
	const [status, setStatus] = useState<'none' | Status>('none');

	const colorLevel = status === 'pending' ? 'var(	--color-status-warning-primary)' : status === 'approved' ? ' var(--color-status-success-primary)' : status === 'rejected' ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)';

	useEffect(() => {
		if (!allProposedChanges) return;
		const proposedChangesForCurrentStop = allProposedChanges.filter(pc => pc?.related_id === relatedId && pc.field === inputName && pc.status === 'pending');

		setData(proposedChangesForCurrentStop);
		setIsNew(proposedChangesForCurrentStop.length === 0);
	}, [relatedId, inputName, allProposedChanges]);

	useEffect(() => {
		const hasPending = data?.find(pc => pc?.status === 'pending');
		setStatus(hasPending ? 'pending' : 'none');
	}, [data]);
	//
	// B. Render Components

	return (
		<div>
			<div className={styles.labelWrapper}>
				{label}
				<IconInfoCircle color={colorLevel} onClick={() => setOpened(!opened)} size={18} />
				<ProposedChangesWrapperModal currentValue={currentValue} inputName={inputName} isNew={isNew} isOpen={opened} onClose={() => setOpened(!opened)} relatedId={relatedId} scope={scope} />
			</div>
			{children}
		</div>
	);

	//
};
