'use client';

/* * */

import { useMeContext } from '@/contexts';
import { useEffect, useState } from 'react';

/**
 * A hook to manage user preferences as state.
 * @param scope The scope of the preference.
 * @param key The key of the preference.
 * @param defaultValue The optional default value of the preference.
 * @returns The current preference value and a function to update it.
 */
export function useUserPreference<T extends boolean | number | string>(scope: string, key: string, defaultValue: T): [T, (value: T) => void] {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	const [preferenceValue, setPreferenceValue] = useState<T>();

	//
	// B. Handle actions

	useEffect(() => {
		const value = meContext.actions.getPreference<T>(scope, key);
		setPreferenceValue(value);
	}, [meContext.data.user]);

	const handleSetPreferenceValue = (value: T) => {
		meContext.actions.updatePreference(scope, key, value);
	};

	//
	// C. Render components

	return [preferenceValue ?? defaultValue, handleSetPreferenceValue];

	//
}
