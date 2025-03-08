'use client';

import { Combobox, ComponentWrapper } from '@tmlmobilidade/ui';

export default function ComboboxExample() {
	return (
		<ComponentWrapper>
			<Combobox data={['Option 1', 'Option 2', 'Option 3']} />
		</ComponentWrapper>
	);
}
