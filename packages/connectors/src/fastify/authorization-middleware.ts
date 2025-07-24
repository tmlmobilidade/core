/* * */

import { type FastifyReply, type FastifyRequest } from '@/fastify/fastify-service.js';
import { getAppConfig, HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type Permission, type User } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';

/* * */

declare module 'fastify' {
	export interface FastifyRequest {
		me: null | User
		permissions: null | Permission<unknown>
	}
}

export function authorizationMiddleware<T = unknown>(scope: string, action: string) {
	return async (request: FastifyRequest, reply: FastifyReply<Permission<T>>): Promise<void> => {
		const token = request.cookies.session_token;

		if (!token) {
			throw new HttpException(
				HttpStatus.UNAUTHORIZED,
				'Invalid authorization token',
			);
		}

		try {
			// Get the permissions
			const apiUrl = `${getAppConfig('auth', 'api_url')}/permissions?resource=${scope}&action=${action}`;
			const res = await fetchData<Permission<T>>(apiUrl, 'GET', undefined, { Cookie: `session_token=${token}` });

			if (res.status !== HttpStatus.OK) {
				throw new HttpException(res.status, res.error ?? 'Unknown error');
			}

			// Set the permissions
			request.permissions = res.data as Permission<T>;

			// Get the user
			const userApiUrl = `${getAppConfig('auth', 'api_url')}/users/me`;
			const userRes = await fetchData<User>(userApiUrl, 'GET', undefined, { Cookie: `session_token=${token}` });

			if (userRes.status !== HttpStatus.OK) {
				throw new HttpException(userRes.status, userRes.error ?? 'Unknown error');
			}

			// Set the user
			request.me = userRes.data;
		}
		catch (error) {
			reply
				.send({
					data: null,
					error: null,
					status: 0,
				})
				.status(error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR);
		}
	};
}
