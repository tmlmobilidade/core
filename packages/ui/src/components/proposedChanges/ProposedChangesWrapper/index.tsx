/* * */

import { ProposedChangesWrapperModal } from '@/components/proposedChanges/ProposedChangesWrapperModal';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ProposedChangesWrapperProps {
	actualValue: string
	children: React.ReactNode
	inputName: string
	label: string
	scope: string
	status: string
}

/* * */

export function ProposedChangesWrapper({ actualValue, children, inputName, label, scope, status }: ProposedChangesWrapperProps) {
	//

	//
	// A. Setup variables
	const [opened, setOpened] = useState(false);

	const colorLevel = status === 'pending' ? 'var(	--color-status-warning-primary)' : status === 'approved' ? ' var(--color-status-success-primary)' : status === 'rejected' ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)';

	//
	// B. Render Components

	return (
		<div>
			<div className={styles.labelWrapper}>
				{label}
				<IconInfoCircle color={colorLevel} onClick={() => setOpened(!opened)} size={18} />
				<ProposedChangesWrapperModal actualValue={actualValue} inputName={inputName} isOpen={opened} onClose={() => setOpened(!opened)} scope={scope} status={status} />
			</div>
			{children}
		</div>
	);

	//
};
