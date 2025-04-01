'use client';

/* * */

import { SimpleSurface } from '@/components/layout/SimpleSurface';

import styles from './styles.module.css';

/* * */

interface Props {

	/**
	 * A set of or a single React component to be rendered inside
	 * an auto-overflowing content pane. This is the main content of the pane.
	 * The pane will automatically add a scrollbar if the content overflows the pane.
	 */
	children?: React.ReactNode

	/**
	 * An array of React components to be rendered as rows inside a fixed header.
	 * This is useful for rendering a title, a toolbar, or any other component that
	 * should be fixed at the top of the pane. The header will be rendered above the children.
	 */
	header?: React.ReactNode[]

}

/* * */

export function Pane({ children, header }: Props) {
	return (
		<SimpleSurface height="full">
			{header && (
				<div className={styles.headerWrapper}>
					{header.map((headerItem, index) => (
						<div key={index} className={styles.headerItem}>{headerItem}</div>
					))}
				</div>
			)}
			{children && <div className={styles.children}>{children}</div>}
		</SimpleSurface>
	);
}
