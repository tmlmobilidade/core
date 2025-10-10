/* * */

import { ProposedChangesWrapperModal } from '@/components/proposedChanges/ProposedChangesWrapperModal';
import { useMeContext } from '@/contexts';
import { IconInfoCircle } from '@tabler/icons-react';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface ProposedChangesWrapperProps {
	actualValue: string
	children: React.ReactNode
	inputName: string
	label: string
	relatedId: string
	scope: string
	status: 'approved' | 'none' | 'pending' | 'rejected'
}

/* * */

export function ProposedChangesWrapper({ actualValue, children, inputName, label, relatedId, scope, status }: ProposedChangesWrapperProps) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const permissions = meContext.data.user?.permissions.filter(p => p.scope === 'proposed_changes') || [];
	const [opened, setOpened] = useState(false);
	const colorLevel = status === 'pending' ? 'var(	--color-status-warning-primary)' : status === 'approved' ? ' var(--color-status-success-primary)' : status === 'rejected' ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)';

	//
	// B. Render Components

	return (
		<div>
			<div className={styles.labelWrapper}>
				{label}
				<IconInfoCircle color={colorLevel} onClick={() => setOpened(!opened)} size={18} />
				<ProposedChangesWrapperModal actualValue={actualValue} inputName={inputName} isOpen={opened} onClose={() => setOpened(!opened)} permissions={permissions} relatedId={relatedId} scope={scope} status={status} />
			</div>
			{children}
		</div>
	);

	//
};
