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
export function useUserPreference<T extends number | string>(scope: string, key: string, defaultValue: T): [T, (value: T) => void] {
	//

	//
	// A. Setup variables

	const meContext = useMeContext();

	const [preferenceValue, setPreferenceValue] = useState<T>(defaultValue);

	//
	// B. Handle actions

	useEffect(() => {
		const value = meContext.actions.getPreference<T>(scope, key) ?? defaultValue;
		setPreferenceValue(value);
	}, [meContext.data.user?.preferences]);

	useEffect(() => {
		console.log('Updating preference', { key, preferenceValue, scope });
		const currentValue = meContext.data.user?.preferences?.[scope]?.[key];
		console.log('Current value', currentValue);
		if (currentValue === preferenceValue) return;
		console.log('Saving preference', { key, preferenceValue, scope });
		meContext.actions.updatePreference(scope, key, preferenceValue);
	}, [preferenceValue]);

	//
	// C. Render components

	return [preferenceValue, setPreferenceValue];
}
