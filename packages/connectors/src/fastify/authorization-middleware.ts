/* * */

import { type FastifyReply, type FastifyRequest } from '@/fastify/fastify-service.js';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type Permission } from '@tmlmobilidade/types';
import { fetchData } from '@tmlmobilidade/utils';

/* * */

declare module 'fastify' {
	export interface FastifyRequest {
		permissions: null | Permission<unknown>
	}
}

export function authorizationMiddleware<T = unknown>(scope: string, action: string) {
	return async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
		const token = request.cookies.session_token;

		if (!token) {
			throw new HttpException(
				HttpStatus.UNAUTHORIZED,
				'Invalid authorization token',
			);
		}

		try {
			const res = await fetchData<Permission<T>>(
				`${process.env.NEXT_PUBLIC_AUTH_URL}/api/permissions?resource=${scope}&action=${action}`,
				'GET',
				undefined,
				{
					Cookie: `session_token=${token}`,
				},
			);

			if (res.status !== HttpStatus.OK) {
				throw new HttpException(res.status, res.error ?? 'Unknown error');
			}

			// Set the permissions
			request.permissions = res.data;
		}
		catch (error) {
			reply
				.status(error.statusCode ?? HttpStatus.INTERNAL_SERVER_ERROR)
				.send({
					message: error.message || 'An unexpected error occurred',
				});
		}
	};
}
