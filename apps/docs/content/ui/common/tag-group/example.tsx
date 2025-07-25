'use client';
import { ComponentWrapper, TagGroup } from '@tmlmobilidade/ui';

export default function TagGroupExample() {
	const tags = [
		{ label: 'Bus' },
		{ label: 'Metro' },
		{ label: 'Ship' },
		{ label: 'Tram' },
		{ label: 'Train' },
		{ label: 'Car' },

	];

	return (
		<ComponentWrapper>
			<TagGroup limit={4} tags={tags} />
		</ComponentWrapper>
	);
}
