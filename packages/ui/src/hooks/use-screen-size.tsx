'use client';

import { getCssVariableValue } from '@/lib/getCssVariableValue';
import * as React from 'react';

const MOBILE_BREAKPOINT = parseInt(getCssVariableValue('--breakpoint-mobile') ?? '768');
const TABLET_BREAKPOINT = parseInt(getCssVariableValue('--breakpoint-tablet') ?? '1024');

export function useScreenSize() {
	if (typeof window === 'undefined') return undefined;
	const [screenSize, setScreenSize] = React.useState<'desktop' | 'mobile' | 'tablet' | undefined>(undefined);

	React.useEffect(() => {
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		const onChange = () => {
			setScreenSize(window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : window.innerWidth < TABLET_BREAKPOINT ? 'tablet' : 'desktop');
		};
		mql.addEventListener('change', onChange);
		setScreenSize(window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : window.innerWidth < TABLET_BREAKPOINT ? 'tablet' : 'desktop');
		return () => mql.removeEventListener('change', onChange);
	}, []);

	return screenSize;
}
