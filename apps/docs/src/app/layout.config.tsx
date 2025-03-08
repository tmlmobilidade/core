import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

import { ThemeDark, ThemeLight, Themer, TMLogoDark, TMLogoLight } from '@tmlmobilidade/ui';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
	disableThemeSwitch: true,
	githubUrl: 'https://github.com/tmlmobilidade',
	i18n: true,
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
				<Themer
					dark={<TMLogoDark />}
					light={<TMLogoLight />}
				/>
			</div>
		),
	},
};
