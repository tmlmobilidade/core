'use client';

import { Collapsible, ComponentWrapper } from '@tmlmobilidade/ui';

export function CollapsibleExample() {
	return (
		<ComponentWrapper>
			<Collapsible title="More Info">
				<p>
					This is the collapsible content. It can be any element or React
					component you like.
				</p>
				<p>
					It can even be another Collapsible component. Check out the next
					section!
				</p>
			</Collapsible>
		</ComponentWrapper>
	);
}
