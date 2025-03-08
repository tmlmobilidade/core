'use client';

import { useEffect, useState } from 'react';

export function useIsActiveDomain(domain: string) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const handleRouteChange = () => {
			const currentDomain = window.location.hostname;
			if (domain.includes(currentDomain)) {
				setIsActive(true);
			}
			else {
				setIsActive(false);
			}
		};

		handleRouteChange(); // Check on initial render

		window.addEventListener('popstate', handleRouteChange);
		window.addEventListener('pushState', handleRouteChange);
		window.addEventListener('replaceState', handleRouteChange);

		return () => {
			window.removeEventListener('popstate', handleRouteChange);
			window.removeEventListener('pushState', handleRouteChange);
			window.removeEventListener('replaceState', handleRouteChange);
		};
	}, [domain]);

	return isActive;
}
