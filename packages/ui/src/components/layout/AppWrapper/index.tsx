'use client';

/* * */

import { AppWrapperHeader } from '@/components/layout/AppWrapperHeader';
import { Loader } from '@/components/loaders/Loader';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useThemeContext } from '@/contexts';
import { useMeContext } from '@/contexts/Me.context';
import { useUserOrganization } from '@/hooks/use-user-organization';
import { Image } from '@mantine/core';
import { type PropsWithChildren, Suspense } from 'react';

import styles from './styles.module.css';

/* * */

export function AppWrapper({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();
	const themeContext = useThemeContext();
	const [organization] = useUserOrganization();

	//
	// B. Render components

	const renderLogo = () => {
		if (!organization) return <Loader size="sm" />;

		const themeMode = themeContext.data.active_mode;
		const logoSrc = `/images/${organization.logo}-${themeMode}.png`;

		return (
			<Image key={logoSrc} alt="App Logo" height={40} src={logoSrc} />
		);
	};

	return (
		<Suspense fallback={<Loader size="xl" />}>
			<div className={styles.container}>
				<div className={styles.appLogo}>
					{renderLogo()}
				</div>
				<AppWrapperHeader userName={meContext.data.user?.first_name} />
				<Sidebar />
				<div className={styles.content}>{children}</div>
			</div>
		</Suspense>
	);

	//
}
