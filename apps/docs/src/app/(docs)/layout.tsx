/* * */

import { baseOptions } from '@/app/layout.config';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { type PropsWithChildren } from 'react';

/* * */

export default async function Layout({ children }: PropsWithChildren) {
	return (
		<DocsLayout tree={source.getPageTree()} {...baseOptions}>
			{children}
		</DocsLayout>
	);
}
