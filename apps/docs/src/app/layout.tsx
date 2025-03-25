/* * */

import 'fumadocs-ui/style.css';
import '@tmlmobilidade/ui/dist/styles-no-reset.css';

/* * */

import { ThemeContextProvider } from '@tmlmobilidade/ui';
import { RootProvider } from 'fumadocs-ui/provider';

/* * */

export default function RootLayout({ children }: { children: React.ReactElement }) {
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
					<ThemeContextProvider>
						{children}
					</ThemeContextProvider>
				</RootProvider>
			</body>
		</html>
	);
}
