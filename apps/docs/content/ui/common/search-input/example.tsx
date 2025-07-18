'use client';

import { ComponentWrapper, SearchInput } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function SearchInputExample() {
	const [query, setQuery] = useState('');

	return (
		<ComponentWrapper>
			<SearchInput onChange={setQuery} value={query} />
		</ComponentWrapper>
	);
}
