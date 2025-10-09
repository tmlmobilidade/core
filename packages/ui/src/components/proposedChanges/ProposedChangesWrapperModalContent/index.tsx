/* * */

import { TextInput } from '@/components';

interface ProposedChangesWrapperModalContentProps {
	actualValue: string
	proposedValue: string
	setProposedValue: (value: string) => void
}

/* * */

export function ProposedChangesWrapperModalContent({ actualValue, proposedValue, setProposedValue }: ProposedChangesWrapperModalContentProps) {
	//

	//
	// A. Render Components

	return (
		<div>
			<TextInput label="Valor atual: " value={actualValue} disabled />
			<TextInput label="Valor proposto: " onChange={e => setProposedValue(e.target.value)} value={proposedValue} />
		</div>
	);
};
