'use client';
import { ComponentWrapper, Section } from '@tmlmobilidade/ui';

export default function SectionExample() {
	return (
		<ComponentWrapper>
			<Section
				alignItems="center"
				flexDirection="row"
				flexWrap="wrap"
				gap="lg"
				justifyContent="center"
				padding="lg"
			>Row
			</Section>

			<Section
				alignItems="flex-end"
				flexDirection="column"
				flexWrap="wrap"
				gap="xs"
				justifyContent="flex-end"
				padding="none"
			>Column
			</Section>

		</ComponentWrapper>
	);
}
