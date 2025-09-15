import { type FastifyRequest } from '@/fastify/fastify-service.js';
import { getAppConfig, HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type Permission, type User } from '@tmlmobilidade/types';
import { fetchData, hasPermission } from '@tmlmobilidade/utils';

declare module 'fastify' {
	export interface FastifyRequest {
		me: User
		permissions: Permission<unknown>[]
	}
}

const AUTH_API_BASE_URL = () => getAppConfig('auth', 'api_url');

/**
 * Fetches user data from the authentication API
 */
async function fetchUserData(sessionToken: string): Promise<User> {
	const userApiUrl = `${AUTH_API_BASE_URL()}/users/me`;
	const userResponse = await fetchData<User>(userApiUrl, 'GET', undefined, { Cookie: `session_token=${sessionToken}` });

	if (userResponse.statusCode !== HttpStatus.OK) {
		throw new HttpException(userResponse.statusCode, userResponse.error ?? 'Failed to fetch user data');
	}

	if (!userResponse.data) {
		throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not found');
	}

	return userResponse.data;
}

/**
 * Fetches user permissions from the authentication API
 */
async function fetchUserPermissions<T>(sessionToken: string): Promise<Permission<T>[]> {
	const permissionsApiUrl = `${AUTH_API_BASE_URL()}/permissions`;
	const permissionsResponse = await fetchData<Permission<T>[]>(permissionsApiUrl, 'GET', undefined, { Cookie: `session_token=${sessionToken}` });

	if (permissionsResponse.statusCode !== HttpStatus.OK) {
		throw new HttpException(permissionsResponse.statusCode, permissionsResponse.error ?? 'Failed to fetch permissions');
	}

	if (!permissionsResponse.data) {
		throw new HttpException(HttpStatus.UNAUTHORIZED, 'Permissions not found');
	}

	return permissionsResponse.data;
}

/**
 * Creates an authorization middleware that validates user authentication and permissions
 * @param scope - The permission scope to check (optional)
 * @param action - The permission action(s) to check (optional)
 * @param requireAll - Whether all actions must be true or at least one must be true
 * @returns Fastify middleware function
 */
export function authorizationMiddleware<T = unknown>(scope?: string, actions?: string | string[], requireAll = false) {
	return async (request: FastifyRequest): Promise<void> => {
		const sessionToken = request.cookies.session_token;

		if (!sessionToken) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid authorization token');
		}

		// Fetch user data
		const user = await fetchUserData(sessionToken);
		request.me = user;

		// Fetch user permissions
		const permissions = await fetchUserPermissions<T>(sessionToken);
		request.permissions = permissions;

		//
		// Check Permissions

		if (!scope) return;

		if (Array.isArray(actions)) {
			const results = actions.map(action => hasPermission(permissions, scope, action));

			const isAllowed = requireAll
				? results.every(Boolean) // all must be true
				: results.some(Boolean); // at least one must be true

			if (!isAllowed) {
				throw new HttpException(HttpStatus.FORBIDDEN, 'Insufficient permissions');
			}
		}
		else {
			if (!hasPermission(permissions, scope, actions as string)) {
				throw new HttpException(HttpStatus.FORBIDDEN, 'Insufficient permissions');
			}
		}
	};
}
