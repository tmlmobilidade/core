'use client';

import { ComponentWrapper, DatePicker, Label } from '@tmlmobilidade/ui';
import { useState } from 'react';

export default function DatePickerExample() {
	const [value, setValue] = useState<Date | null>(null);

	return (
		<ComponentWrapper>
			<div className="flex flex-col gap-2" style={{ width: '30%' }}>
				<DatePicker onChange={setValue} value={value} fullWidth />
				<Label>Value: {value?.toLocaleDateString()}</Label>
			</div>
		</ComponentWrapper>
	);
}
