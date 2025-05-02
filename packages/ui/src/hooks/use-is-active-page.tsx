'use client';

import { useEffect, useState } from 'react';

export function useIsActivePage(href: string) {
	if (typeof window === 'undefined') {
		return false;
	}

	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		const handleRouteChange = () => {
			const pathname = window.location.pathname;
			console.log(href, pathname);
			if (href === pathname || (href === '/' && pathname === '/')) {
				setIsActive(true);
			}
			else if (href && href.includes(pathname) && href !== '/') {
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
	}, [href, window.location.pathname]);

	return isActive;
}
