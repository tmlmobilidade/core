/* * */

import { TextInput } from '@/components';
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { CreateProposedChangeDto, ProposedChange } from '@tmlmobilidade/types';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalContentProps<S extends ScopeKey> {
	originalInput?: React.ReactElement
	proposedChangeData?: ProposedChange<ScopeEntityMap[S]>
	setProposedChange: (value: CreateProposedChangeDto<ScopeEntityMap[S]> | undefined) => void
}

/* * */

export function ProposedChangesWrapperModalContentItem<S extends ScopeKey>({ originalInput, proposedChangeData, setProposedChange }: ProposedChangesWrapperModalContentProps<S>) {
	//

	//
	// A.Setup Variables

	const [proposedChangeValue, setProposedChangeValue] = useState<string | undefined>(undefined);

	//
	// B. Handler Actions

	const handleChange = (value: string) => {
		setProposedChangeValue(value);
		setProposedChange({ ...proposedChangeData, curr_value: value } as CreateProposedChangeDto<ScopeEntityMap[S]>);
	};

	//
	// C. Render Components

	return (
		<>
			{proposedChangeData && (
				<>
					{originalInput}
					<TextInput label={proposedChangeData.field.toString()} onChange={e => handleChange(e.target.value)} value={proposedChangeData?.curr_value?.toString()} disabled />
				</>
			)}

			{!proposedChangeData && (
				<TextInput onChange={e => handleChange(e.target.value)} value={proposedChangeValue || ''} />
			)}
		</>
	);

	//
};
