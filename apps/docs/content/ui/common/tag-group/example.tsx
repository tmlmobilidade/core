'use client';
import { ComponentWrapper, TagGroup } from '@tmlmobilidade/ui';

export default function TagGroupExample() {
	const tags = [
		{ label: 'Bus' },
		{ label: 'Metro' },
		{ label: 'Ship' },
		{ label: 'Train' },
	];

	return (
		<ComponentWrapper>
			<TagGroup tags={tags} />
		</ComponentWrapper>
	);
}
