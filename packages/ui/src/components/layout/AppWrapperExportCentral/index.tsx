'use client';

import { Label } from '@/components/display/Label';
/* * */

import { AppWrapperExportCentralList } from '@/components/layout/AppWrapperExportCentralList';
import { Section } from '@/components/layout/Section';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCloudDown, IconCloudMinus } from '@tabler/icons-react';
import { useMeContext } from 'index';

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
		<Menu offset={0} position="bottom-end" shadow="lg" width="40%" withArrow>
			<Menu.Target>
				<ActionIcon color={fileExports.length > 0 ? 'var(--color-status-danger-primary)' : 'var(--color-system-text-200)'} variant="subtle">
					{fileExports.length > 0 && (
						<div>{fileExports.length}</div>
					)}
					<IconCloudDown size={20} />
				</ActionIcon>
			</Menu.Target>
			<Menu.Dropdown style={{ maxHeight: '90vh', overflow: 'scroll' }}>
				<AppWrapperExportCentralList fileExports={fileExports} />

				{fileExports.length === 0 && (
					<Section alignItems="center" gap="sm" justifyContent="center">
						<IconCloudMinus color="var(--color-system-text-200)" size={20} />
						<Label size="md">Não há exportações</Label>
					</Section>
				)}

			</Menu.Dropdown>
		</Menu>
	);

	//
}
