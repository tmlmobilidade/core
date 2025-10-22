'use client';

import { Section } from '@/components';
import { Label } from '@/components/display/Label';

/* * */

import { AppWrapperExportCentralItemContent } from '@/components/layout/AppWrapperExportCentralItemContent';
import { FileExport } from '@tmlmobilidade/types';
import { useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface AppWrapperExportCentralListProps {
	fileExports: FileExport[]
}

/* * */

export function AppWrapperExportCentralList({ fileExports }: AppWrapperExportCentralListProps) {
	//

	//
	// A. Setup variables

	const [showAll, setShowAll] = useState(false);
	const displayFileExports = useMemo(() => {
		return showAll ? fileExports : fileExports.slice(0, 5);
	}, [fileExports, showAll]);

	//
	// C. Render components
	if (fileExports.length === 0) {
		return null;
	}

	return (
		<Section flexDirection="column" gap="sm" padding="sm" width="100%">
			<Label size="sm">({fileExports.length}) Exportações</Label>
			{displayFileExports.map(fileExport => (
				<AppWrapperExportCentralItemContent key={fileExport._id} fileExport={fileExport} />
			))}
			{displayFileExports.length > 5 && (
				<button className={styles.moreButton} onClick={() => setShowAll(!showAll)}>
					{showAll ? 'Ver menos' : 'Ver mais'}
				</button>
			)}
		</Section>
	);

	//
}
