/* * */

import { type FastifyRequest } from '@/fastify/fastify-service.js';
import { getAppConfig, HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type Permission, type User } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';

/* * */

declare module 'fastify' {
	export interface FastifyRequest {
		me: null | User
		permissions: Permission<unknown>[]
	}
}

export function authorizationMiddleware<T = unknown>(scope: string, action: string) {
	return async (request: FastifyRequest): Promise<void> => {
		const token = request.cookies.session_token;

		if (!token) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid authorization token');
		}

		// Get the permissions
		const apiUrl = `${getAppConfig('auth', 'api_url')}/permissions?resource=${scope}&action=${action}`;
		const res = await fetchData<Permission<T>[]>(apiUrl, 'GET', undefined, { Cookie: `session_token=${token}` });

		if (res.statusCode !== HttpStatus.OK || !res.data) {
			throw new HttpException(res.statusCode, res.error ?? 'Unknown error');
		}

		// Set the permissions
		request.permissions = res.data ?? [];

		// Get the user
		const userApiUrl = `${getAppConfig('auth', 'api_url')}/users/me`;
		const userRes = await fetchData<User>(userApiUrl, 'GET', undefined, { Cookie: `session_token=${token}` });

		if (userRes.statusCode !== HttpStatus.OK) {
			throw new HttpException(userRes.statusCode, userRes.error ?? 'Unknown error');
		}

		// Set the user
		request.me = userRes.data;
	};
}
