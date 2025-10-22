'use client';

/* * */

import { AppWrapperMenu } from '@/components/layout/AppWrapper/components/common/AppWrapperMenu';
import { AppWrapperMenuList } from '@/components/layout/AppWrapper/components/common/AppWrapperMenuList';
import { AppWrapperMenuNoContent } from '@/components/layout/AppWrapper/components/common/AppWrapperMenuNoContent';
import { IconCloudDown, IconCloudMinus } from '@tabler/icons-react';
import { useMeContext } from 'index';

import { ExportsMenuItem } from '../ExportsMenuItem';

/* * */

export function ExportsMenu() {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const fileExports = meContext.data.fileExports || [];

	//
	// B. Render components

	return (
		<AppWrapperMenu counter={fileExports.length} icon={IconCloudDown}>
			<AppWrapperMenuList data={fileExports} itemComponent={({ item }) => <ExportsMenuItem fileExport={item} />} title="Exportações" />

			{fileExports.length === 0 && (
				<AppWrapperMenuNoContent icon={IconCloudMinus} text="Sem exportações disponíveis" />
			)}
		</AppWrapperMenu>
	);

	//
}
