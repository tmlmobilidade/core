/* * */

import { authProvider } from '@/providers/auth/auth.js';
import { type FastifyRequest } from '@tmlmobilidade/connectors';
import { HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type Permission, type User } from '@tmlmobilidade/types';
import { hasPermission } from '@tmlmobilidade/utils';

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

		const permissions = await authProvider.getPermissions<T>(token);
		if (!hasPermission(permissions, scope, action)) {
			throw new HttpException(HttpStatus.FORBIDDEN, 'User does not have permissions');
		}

		const user = await authProvider.getUser(token);
		request.me = user;
	};
}
