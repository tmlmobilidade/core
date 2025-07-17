'use client';

/* * */

import { AppWrapperHeader } from '@/components/layout/AppWrapperHeader';
import { Loader } from '@/components/loaders/Loader';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useMeContext } from '@/contexts/Me.context';
import { type PropsWithChildren, Suspense } from 'react';

import styles from './styles.module.css';

/* * */

export function AppWrapper({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	//
	// B. Render components

	return (
		<Suspense fallback={<Loader size="xl" />}>
			<div className={styles.container}>
				<div className={styles.appLogo} />
				<AppWrapperHeader userName={meContext.data.user?.first_name} />
				<Sidebar />
				<div className={styles.content}>{children}</div>
			</div>
		</Suspense>
	);

	//
}
