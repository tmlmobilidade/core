'use client';

import { IconSearch } from '@tabler/icons-react';
import { ComponentWrapper, TextInput } from '@tmlmobilidade/ui';

export default function TextInputExample() {
	return (
		<ComponentWrapper>
			<TextInput leftSection={<IconSearch />} placeholder="Pesquisar..." />
		</ComponentWrapper>
	);
}
