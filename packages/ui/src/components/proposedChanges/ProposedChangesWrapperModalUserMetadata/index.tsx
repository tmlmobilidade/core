/* * */

import { UnixTimestamp } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/utils';

/* * */

interface ProposedChangesWrapperModalUserMetadataProps {
	createdAt: UnixTimestamp
	createdBy: string
}

/* * */

export function ProposedChangesWrapperModalUserMetadata({ createdAt, createdBy }: ProposedChangesWrapperModalUserMetadataProps) {
	//

	//
	// A. Setup Variables

	const createdAtFormatted = Dates.fromUnixTimestamp(createdAt).setZone('Europe/Lisbon', 'rebase_utc').toLocaleString(Dates.FORMATS.DATETIME_MEDIUM);

	//
	// B. Render Components

	return (
		<>
			<p>{createdBy}</p>
			<p>{createdAtFormatted}</p>
		</>

	);

	//
}
