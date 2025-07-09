/* * */

import { Label } from '@/components/display/Label';
import { PropsWithChildren } from 'react';

/* * */

interface FiltersBarProps {
	label?: string
}

/* * */

export function FiltersBar({ children, label = 'Filtrar por' }: PropsWithChildren<FiltersBarProps>) {
	return (
		<>
			<Label size="sm" caps singleLine>{label}</Label>
			{children}
		</>
	);
}
