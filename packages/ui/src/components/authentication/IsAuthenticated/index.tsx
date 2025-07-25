'use client';

/* * */

import { LoadingOverlay } from '@/components/loaders';
import { useMeContext } from '@/contexts/Me.context';
import { getAppConfig } from '@tmlmobilidade/lib';
import { type PropsWithChildren, useEffect } from 'react';

/* * */

export function IsAuthenticated({ children }: PropsWithChildren) {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	//
	// B. Handle actions

	useEffect(() => {
		// Exit if meContext is loading
		if (meContext.flags.loading) return;
		// If user is not authenticated redirect to login page
		if (!meContext.data.user) {
			window.location.href = `${getAppConfig('auth', 'frontend_url')}/login`;
		}
	}, [meContext.flags.loading, meContext.data.user]);

	//
	// C. Render components

	if (meContext.flags.loading) {
		return <LoadingOverlay />;
	}

	if (!meContext.data.user) {
		return null;
	}

	return children;

	//
}
