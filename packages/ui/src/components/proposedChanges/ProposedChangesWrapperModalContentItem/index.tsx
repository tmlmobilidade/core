/* * */

import { TextInput } from '@/components';
import { ProposedChange, Stop } from '@tmlmobilidade/types';
import { useState } from 'react';

/* * */

interface ProposedChangesWrapperModalContentProps {
	proposedChangeData: ProposedChange<Stop>
	setProposedChange: (value: ProposedChange<Stop>) => void
}

/* * */

export function ProposedChangesWrapperModalContentItem({ proposedChangeData, setProposedChange }: ProposedChangesWrapperModalContentProps) {
	//

	//
	// A.Setup Variables

	const [proposedChangeValue, setProposedChangeValue] = useState<string>();

	//
	// B. Handler Actions

	const handleChange = (value: string) => {
		setProposedChangeValue(value);
		setProposedChange({ ...proposedChangeData, curr_value: value } as ProposedChange<Stop>);
	};

	//
	// C. Render Components

	return (
		<div>
			{
				proposedChangeData && (
					<>
						<div key={proposedChangeData?._id}>
							<p>{proposedChangeData?.field}</p>
							<TextInput onChange={e => handleChange(e.target.value)} value={proposedChangeData?.curr_value?.toString()} />
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
