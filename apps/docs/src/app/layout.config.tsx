/* * */

import { TMLogoDark, TMLogoLight, WhenMode } from '@tmlmobilidade/ui';
import { type BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations.
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	githubUrl: 'https://github.com/tmlmobilidade',
	i18n: false,
	// links: [
	// 	{
	// 		external: true,
	// 		text: 'Website',
	// 		url: 'https://tmlmobilidade.pt',
	// 	},
	// ],
	nav: {
		title: (
			<div className="px-4 pb-4">
				<WhenMode
					dark={<TMLogoDark />}
					light={<TMLogoLight />}
				/>
			</div>
		),
	},
};
