import type { ReactNode } from 'react';

/* * */

import './global.css';
import '@tmlmobilidade/ui/styles-no-reset.css';

/* * */

import { ThemeProvider } from '@tmlmobilidade/ui';
import { RootProvider } from 'fumadocs-ui/provider';
import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-work-sans',
	weight: ['600', '700'],
});

export default function Layout({ children }: { children: ReactNode }) {
	return (
		<html className={workSans.className} lang="en" suppressHydrationWarning>
			<body>
				<RootProvider>
					<ThemeProvider fontFamilyStyle={workSans.style.fontFamily} initialTheme="ocean">
						{children}
					</ThemeProvider>
				</RootProvider>
			</body>
		</html>
	);
}
