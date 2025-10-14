/* * */

import { TextInput } from '@/components';
import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { ProposedChange } from '@tmlmobilidade/types';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalContentProps<S extends ScopeKey> {
	proposedChangeData: ProposedChange<ScopeEntityMap[S]>
	setProposedChange: (value: ProposedChange<ScopeEntityMap[S]>) => void
}

/* * */

export function ProposedChangesWrapperModalContentItem<S extends ScopeKey>({ proposedChangeData, setProposedChange }: ProposedChangesWrapperModalContentProps<S>) {
	//

	//
	// A.Setup Variables

	const [proposedChangeValue, setProposedChangeValue] = useState<string>();

	//
	// B. Handler Actions

	const handleChange = (value: string) => {
		setProposedChangeValue(value);
		setProposedChange({ ...proposedChangeData, curr_value: value } as ProposedChange<ScopeEntityMap[S]>);
	};

	//
	// C. Render Components

	return (
		<div>
			{
				proposedChangeData && (
					<>
						<div key={proposedChangeData?._id}>
							<p>{String(proposedChangeData?.field)}</p>
							<TextInput onChange={e => handleChange(e.target.value)} value={proposedChangeData?.curr_value?.toString()} disabled />
						</div>
					</>
				)
			}

			{!proposedChangeData && (
				<TextInput
					onChange={e => handleChange(e.target.value)}
					value={proposedChangeValue || ''}
				/>
			)}

		</div>
	);

	//
};
