'use client';

/* * */

import { AppWrapperHeader } from '@/components/layout/AppWrapperHeader';
import { Loader } from '@/components/loaders/Loader';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { useThemeContext } from '@/contexts';
import { useMeContext } from '@/contexts/Me.context';
import { useUserOrganization } from '@/hooks/use-user-organization';
import { Image } from '@mantine/core';
import { useColorScheme } from '@mantine/hooks';
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
	const colorScheme = useColorScheme();

	//
	// B. Render components

	const renderLogo = () => {
		if (!organization) return;

		const themeMode = themeContext.data.active_mode;
		const activeLogo = themeMode === 'system' ? (colorScheme === 'dark' ? organization.logo_dark : organization.logo_light) : (themeMode === 'dark' ? organization.logo_dark : organization.logo_light);
		console.log('ACTIVE LOGO: ', activeLogo);
		return (
			<Image key={activeLogo} alt="App Logo" height={40} src={activeLogo} />
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
