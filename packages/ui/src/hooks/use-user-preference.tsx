'use client';

/* * */

import { useMeContext } from '@/contexts';
import { useEffect, useState } from 'react';

/**
 * A custom hook to get the current URL.
 * @param refreshRate The rate at which to refresh the URL. Defaults to `100` ms.
 * @returns The current URL.
 */
export function useUserPreference<T>(scope: string, key: string, defaultValue?: T, refreshRate?: number): { update: (value: T | undefined) => void, value: T | undefined } {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	const [localPreference, setLocalPreference] = useState<T | undefined>(defaultValue);

	//
	// B. Handle actions

	const updateLocalPreference = () => {
		// const value = meContext.data.user.preferences?.[scope]?.[key] as T | undefined ?? defaultValue;
		// setLocalPreference();
	};

	useEffect(() => {
		updateLocalPreference();
		const interval = setInterval(updateLocalPreference, refreshRate ?? 100);
		return () => clearInterval(interval);
	}, []);

	//
	// C. Render components

	return { update: setLocalPreference, value: localPreference };

	//
}
