'use client';

import { useEffect, useState } from 'react';

export function useIsActivePage(href: string) {
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const handleRouteChange = () => {
			const pathname = window.location.pathname;
			if (href === pathname || (href === '/' && pathname === '/')) {
				setIsActive(true);
			}
			else if (href && pathname.includes(href) && href !== '/') {
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
	}, [href]);

	return isActive;
}
