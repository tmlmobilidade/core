'use client';

/* * */

import { useMeContext } from '@/contexts/Me.context';
import { type PropsWithChildren } from 'react';

/* * */

export function IsAuthenticated({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	//
	// B. Render components

	if (!meContext.data.user) {
		return null;
	}

	return children;

	//
}
