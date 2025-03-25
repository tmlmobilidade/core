'use client';

/**
 * Use to show children only when light theme is active. Hidden otherwise.
 * @param {React.ReactElement} children The content to display in light theme.
 * @returns {React.ReactElement} The rendered ThemeLight component.
 */
export function ThemeLight({ children }: { children: React.ReactNode }): React.ReactElement {
	return (
		<div className="theme-light">
			{children}
		</div>
	);
}

/**
 * Use to show children only when dark theme is active. Hidden otherwise.
 * @param {React.ReactNode} children The content to display in dark theme.
 * @returns {React.ReactElement} The rendered ThemeDark component.
 */
export function ThemeDark({ children }: { children: React.ReactNode }): React.ReactElement {
	return (
		<div className="theme-dark">
			{children}
		</div>
	);
}

/**
 * ThemeSwitch component to automatically toggle children components between dark and light themes.
 * @param {React.ReactNode} dark The content to display in dark theme.
 * @param {React.ReactNode} light The content to display in light theme.
 * @returns {React.ReactElement} The rendered ThemeSwitch component.
 */
export function Themer({ dark, light }: { dark: React.ReactNode, light: React.ReactNode }): React.ReactElement {
	return (
		<>
			<ThemeDark>
				{dark}
			</ThemeDark>
			<ThemeLight>
				{light}
			</ThemeLight>
		</>
	);
}
