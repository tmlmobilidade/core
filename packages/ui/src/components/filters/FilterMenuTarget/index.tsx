/* * */

import { forwardRef } from 'react';

import styles from './styles.module.css';

/* * */

interface FilterMenuTargetProps extends React.ComponentPropsWithoutRef<'div'> {
	active?: boolean
	disabled?: boolean
	label: string
}

/* * */

export const FilterMenuTarget = forwardRef<HTMLDivElement, FilterMenuTargetProps>(({ active, disabled, label, ...props }: FilterMenuTargetProps, ref) => (
	<div {...props} ref={ref} className={styles.root} data-active={active} data-disabled={disabled}>
		{label ?? 'Missing Label!'}
	</div>
));
