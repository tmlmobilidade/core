'use client';

/* * */

import { IconCloudDown, IconCloudMinus } from '@tabler/icons-react';
import { useMeContext } from 'index';

import { AppWrapperExportsItem } from '../AppWrapperExportItem';
import { AppWrapperMenu } from '../AppWrapperMenu';
import { AppWrapperMenuList } from '../AppWrapperMenuList';
import { AppWrapperMenuNoContent } from '../AppWrapperMenuNoContent';

/* * */

export function AppWrapperExportCentral() {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const fileExports = meContext.data.fileExports || [];

	//
	// B. Render components

	return (
		<AppWrapperMenu counter={fileExports.length} icon={IconCloudDown}>
			<AppWrapperMenuList data={fileExports} itemComponent={({ item }) => <AppWrapperExportsItem fileExport={item} />} title="Exportações" />

			{fileExports.length === 0 && (
				<AppWrapperMenuNoContent icon={IconCloudMinus} text="Sem exportações disponíveis" />
			)}
		</AppWrapperMenu>
	);

	//
}
