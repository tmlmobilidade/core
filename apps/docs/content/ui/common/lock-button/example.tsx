'use client';

/* * */

import { ComponentWrapper, LockButton } from '@tmlmobilidade/ui';
import { useState } from 'react';

/* * */

export default function LockButtonExample() {
	//

	const [isLocked, setIsLocked] = useState(false);

	return (
		<ComponentWrapper>
			<LockButton isLocked={isLocked} onClick={() => setIsLocked(prev => !prev)} />
		</ComponentWrapper>
	);

	//
}
