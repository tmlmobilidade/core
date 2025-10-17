/* * */

import 'fumadocs-ui/style.css';
import '@tmlmobilidade/ui/styles-no-reset';

/* * */

import { BaseProvider } from '@tmlmobilidade/ui';
import { RootProvider } from 'fumadocs-ui/provider';
import { type PropsWithChildren } from 'react';

/* * */

export default function RootLayout({ children }: PropsWithChildren) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				style={{
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100vh',
				}}
			>
				<RootProvider>
					<BaseProvider>
						{children}
					</BaseProvider>
				</RootProvider>
			</body>
		</html>
	);
}
