'use client';

import { getValueAtPath } from '@/lib/utils';
import { useDebouncedValue } from '@mantine/hooks';
import { useMemo, useState } from 'react';

function accessorSearch<T>(
	record: T,
	accessor: keyof T | (string & {}),
	query: string,
) {
	return getValueAtPath(record, accessor)
		?.toString()
		.toLowerCase()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.includes(query);
}

function plainSearch<T>(record: T, query: string) {
	return Object.values(String(record)).some(value =>
		value
			?.toString()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.includes(query),
	);
}

export function useSearchQuery<T>(
	data: T[],
	{
		accessors,
		customSearch,
		debounce = 200,
	}: {
		accessors?: (keyof T | (string & {}))[]
		customSearch?: (record: T, query: string) => boolean
		debounce?: number
	} = {},
) {
	const [searchQuery, setSearchQuery] = useState<string | undefined>(
		undefined,
	);
	const [debouncedSearchQuery] = useDebouncedValue(searchQuery, debounce);

	const filteredData = useMemo(() => {
		let filteredData: T[] = [...data];

		if (debouncedSearchQuery && debouncedSearchQuery.length > 0) {
			const query = debouncedSearchQuery
				.toLowerCase()
				.normalize('NFD')
				.replace(/[\u0300-\u036f]/g, '');
			filteredData = filteredData.filter((record) => {
				if (!accessors) {
					return plainSearch<T>(record, query);
				}

				const accessorMatch = accessors
					? accessors.some(accessor =>
						accessorSearch<T>(record, accessor, query),
					)
					: false;

				const customMatch = customSearch
					? customSearch(record, query)
					: false;

				return accessorMatch || customMatch;
			});
		}

		return filteredData;
	}, [data, debouncedSearchQuery, accessors]);

	return { filteredData, searchQuery, setSearchQuery };
}
