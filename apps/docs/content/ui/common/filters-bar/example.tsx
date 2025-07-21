'use client';

import { ComponentWrapper, Label } from '@tmlmobilidade/ui';

export default function FiltersBarExample({ label = 'Filtrar por' }) {
	return (
		<ComponentWrapper>
			<>
				<Label>{label}</Label>
			</>
		</ComponentWrapper>
	);
}
