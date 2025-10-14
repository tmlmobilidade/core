import { ScopeEntityMap, ScopeKey } from '@/contexts/ProposedChanges.context';
import { ProposedChange } from '@tmlmobilidade/types';

interface ProposedChangesWrapperModalMetadataProps<S extends ScopeKey> {
	proposedChangeData: ProposedChange<ScopeEntityMap[S]>
}

export function ProposedChangesWrapperModalMetadata<S extends ScopeKey>({ proposedChangeData }: ProposedChangesWrapperModalMetadataProps<S>) {
	if (!proposedChangeData) return null;

	return (
		<p>
			{Array.isArray(proposedChangeData.curr_value)
				? proposedChangeData.curr_value.map((item, idx) =>
					typeof item === 'object'
						? <span key={idx}>{JSON.stringify(item)}</span>
						: <span key={idx}>{String(item)}</span>,
				)
				: typeof proposedChangeData.curr_value === 'object' && proposedChangeData.curr_value !== null
					? JSON.stringify(proposedChangeData.curr_value)
					: String(proposedChangeData.curr_value)}
		</p>
	);
}
