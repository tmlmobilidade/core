'use client';

/* * */

import { AppWrapperHeader } from '@/components/layout/AppWrapper/components/common/AppWrapperHeader';
import { Loader } from '@/components/loaders/Loader';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useMeContext } from '@/contexts/Me.context';
import { useOrganizationLogo } from '@/hooks/use-organization-logo';
import { Image } from '@mantine/core';
import { type PropsWithChildren, Suspense } from 'react';

import styles from './styles.module.css';

/* * */

export function AppWrapper({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const logo = useOrganizationLogo(meContext.data.user?.organization_id || '');

	//
	// B. Render components

	return (
		<Suspense fallback={<Loader size="xl" />}>
			<div className={styles.container}>
				<div className={styles.appLogo}>
					<Image key={logo} alt="Logo" height={40} src={logo} />
				</div>
				<AppWrapperHeader userName={meContext.data.user?.first_name} />
				<Sidebar />
				<div className={styles.content}>{children}</div>
			</div>
		</Suspense>
	);

	//
}
