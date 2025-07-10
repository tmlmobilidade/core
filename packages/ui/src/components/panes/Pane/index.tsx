/* * */

import { Surface, type SurfaceProps } from '@/components/layout/Surface';

import styles from './styles.module.css';

/* * */

interface PaneProps {

	/**
	 * The alignment of the pane content.
	 * @default 'start'
	 */
	align?: SurfaceProps['align']

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

	/**
	 * The justification of the pane content.
	 * @default 'start'
	 */
	justify?: SurfaceProps['justify']

	/**
	 * The variant of the Surface component.
	 * @default 'default'
	 */
	variant?: SurfaceProps['variant']

}

/* * */

export function Pane({ align, children, header, justify, variant = 'default' }: PaneProps) {
	return (
		<Surface align={align} height="full" justify={justify} variant={variant}>
			{header && (
				<div className={styles.headerWrapper}>
					{header.map((headerItem, index) => (
						<div key={index} className={styles.headerItem}>{headerItem}</div>
					))}
				</div>
			)}
			{children && <div className={styles.children}>{children}</div>}
		</Surface>
	);
}
