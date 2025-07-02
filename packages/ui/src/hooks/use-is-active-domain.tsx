'use client';

/* * */

import { useEffect, useState } from 'react';

/* * */

export function useIsActiveDomain(domain: string) {
	//

	//
	// A. Setup variables

	const [isActive, setIsActive] = useState(false);

	//
	// B. Handle actions

	useEffect(() => {
		// Check if the current domain matches the provided domain
		// and if the port matches (if in development mode)
		const handleRouteChange = () => {
			const currentDomain = window.location.href;
			const currentPort = process.env.NODE_ENV === 'development' ? `:${window.location.port}` : '';
			if (domain.includes(currentDomain) && domain.includes(currentPort)) setIsActive(true);
			else setIsActive(false);
		};
		// Check on initial render
		handleRouteChange();
		// Setup event listeners for route changes
		window.addEventListener('popstate', handleRouteChange);
		window.addEventListener('pushState', handleRouteChange);
		window.addEventListener('replaceState', handleRouteChange);
		// Cleanup event listeners on unmount
		return () => {
			window.removeEventListener('popstate', handleRouteChange);
			window.removeEventListener('pushState', handleRouteChange);
			window.removeEventListener('replaceState', handleRouteChange);
		};
	}, [domain]);

	//
	// C. Render components

	return isActive;

	//
}
