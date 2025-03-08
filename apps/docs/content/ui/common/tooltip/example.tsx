'use client';

import { ComponentWrapper, Text, Tooltip } from '@tmlmobilidade/ui';

export default function TooltipExample() {
	return (
		<ComponentWrapper>
			<Tooltip label="This is a tooltip">
				<Text>Hover me</Text>
			</Tooltip>
		</ComponentWrapper>
	);
}
