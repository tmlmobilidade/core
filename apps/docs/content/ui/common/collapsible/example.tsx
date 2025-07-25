'use client';

import { Collapsible, ComponentWrapper } from '@tmlmobilidade/ui';

export function CollapsibleExample() {
	return (
		<ComponentWrapper>
			<Collapsible description="Click to expand or collapse" title="More Info">
				<p>
					This is the collapsible content.
				</p>
				<p>
					It can even be another Collapsible component.
				</p>
			</Collapsible>
		</ComponentWrapper>
	);
}
