'use client';

/* * */

/**
 * Use to show children only when light theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in light theme.
 * @returns {JSX.Element} The rendered ThemeLight component.
 */

export function ThemeLight({ children }: { children: React.ReactNode }) {
	return (
		<div className="theme-light">
			{children}
		</div>
	);
}

/**
 * Use to show children only when dark theme is active. Hidden otherwise.
 * @param {ReactNode} children The content to display in dark theme.
 * @returns {JSX.Element} The rendered ThemeDark component.
 */

export function ThemeDark({ children }: { children: React.ReactNode }) {
	return (
		<div className="theme-dark">
			{children}
		</div>
	);
}

/**
 * ThemeSwitch component to automatically toggle children components between dark and light themes.
 * @param {ReactNode} dark The content to display in dark theme.
 * @param {ReactNode} light The content to display in light theme.
 * @returns {JSX.Element} The rendered ThemeSwitch component.
 */

export function Themer({ dark, light }: { dark: React.ReactNode, light: React.ReactNode }) {
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
