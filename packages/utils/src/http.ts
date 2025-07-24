import { HttpException } from '@tmlmobilidade/lib';

// Define the HttpResponse type
export interface HttpResponse<T> {
	data: null | T
	error: null | string
	status: number
}

export type WithPagination<T> = T & {
	pagination: {
		limit: number
		page: number
		total: number
	}
};

interface ErrorResponse {
	message: string
}

/**
 * Fetches data from a URL with configurable HTTP method, body, headers, and options.
 * @param url - The URL to fetch from
 * @param method - The HTTP method to use (DELETE, GET, POST, PUT). Defaults to GET.
 * @param body - Optional request body data
 * @param headers - Optional request headers
 * @param options - Optional fetch options (excluding body, headers, method)
 * @returns Promise resolving to HttpResponse containing data, error and status
 * @example
 * ```ts
 * // GET request
 * const response = await fetchData<User>('/api/users/123');
 *
 * // POST request with body
 * const response = await fetchData<User>(
 *   '/api/users',
 *   'POST',
 *   { name: 'John', email: 'john@example.com' }
 * );
 * ```
 */
export async function fetchData<T>(
	url: string,
	method: 'DELETE' | 'GET' | 'POST' | 'PUT' = 'GET',
	body?: unknown,
	headers: Record<string, string> = {},
	options: Omit<RequestInit, 'body' | 'headers' | 'method'> = {},
): Promise<HttpResponse<T>> {
	try {
		const response = await fetch(url, {
			body: body ? JSON.stringify(body) : undefined,
			credentials: 'include',
			headers: {
				...(method === 'GET' || method === 'DELETE' || 'Content-Type' in headers ? {} : { 'Content-Type': 'application/json' }),
				...headers,
			},
			method,
			...options,
		});

		const data = await response.json();

		if (!response.ok) {
			const errorData = data as ErrorResponse;
			return {
				data: null,
				error: errorData.message || 'An error occurred',
				status: response.status,
			};
		}

		return {
			data: data as T,
			error: null,
			status: response.status,
		};
	}
	catch (error) {
		return {
			data: null,
			error: error instanceof Error ? error.message : 'Network error',
			status: 500,
		};
	}
}

/**
 * Sends a multipart form data request to a URL.
 * @param url - The URL to send the request to
 * @param formData - The FormData object containing the multipart form data
 * @returns Promise resolving to HttpResponse containing data, error and status
 * @example
 * ```ts
 * const formData = new FormData();
 * formData.append('file', fileBlob);
 * formData.append('name', 'profile.jpg');
 * const response = await multipartFetch('/api/upload', formData);
 * ```
 */
export async function multipartFetch<T>(url: string, formData: FormData): Promise<HttpResponse<T>> {
	try {
		const response = await fetch(url, {
			body: formData,
			credentials: 'include',
			method: 'POST',
		});

		const data = await response.json();

		if (!response.ok) {
			return {
				data: null,
				error: (data as ErrorResponse).message || 'An error occurred',
				status: response.status,
			};
		}

		return {
			data: data as T,
			error: null,
			status: response.status,
		};
	}
	catch (error) {
		return {
			data: null,
			error: error instanceof Error ? error.message : 'Network error',
			status: 500,
		};
	}
}

/**
 * Uploads a file to a URL using multipart form data.
 * @param url - The URL to send the request to
 * @param file - The file to upload
 * @returns Promise resolving to HttpResponse containing data, error and status
 * @example
 * ```ts
 * const response = await uploadFile('/api/upload', file);
 * ```
 */
export async function uploadFile<T>(url: string, file: File): Promise<HttpResponse<T>> {
	const formData = new FormData();
	formData.append('file', file, file.name);
	return await multipartFetch<T>(url, formData);
}

/**
 * Fetches data from a URL using the SWR fetcher function.
 * @param url - The URL to fetch from
 * @returns Promise resolving to the fetched data
 * @example
 * ```ts
 * const data = await swrFetcher('/api/users/123');
 * ```
 */
export const swrFetcher = async <T>(url: string): Promise<T> => {
	const res = await fetch(url, { credentials: 'include' });
	const data = await res.json();

	if (!res.ok) {
		throw new HttpException(res.status, (data as ErrorResponse).message);
	}

	return data as T;
};
