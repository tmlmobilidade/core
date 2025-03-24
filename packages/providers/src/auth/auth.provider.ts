import { roles, sessions, users, verificationTokens } from '@/interfaces/index.js';
import HttpException from '@/lib/http-exception.js';
import HttpStatus from '@/lib/http-status.js';
import { CreateUserDto, LoginDto, Permission, Session } from '@/types/index.js';
import { AsyncSingletonProxy, getUnixTimestampFromJSDate } from '@/utils/index.js';
import { generateRandomString, generateRandomToken, getPermission, getUnixTimestamp } from '@/utils/index.js';
import bcrypt from 'bcryptjs';
import { DateTime } from 'luxon';

import { emailProvider } from '../email/email.provider.js';

class AuthProvider {
	private static _instance: AuthProvider;

	/**
	 * Return the instance of the AuthProvider.
	 */
	public static async getInstance() {
		if (!AuthProvider._instance) {
			AuthProvider._instance = new AuthProvider();
		}
		return AuthProvider._instance;
	}

	/**
	 * Get Permissions
	 *
	 * @param session_token - The session token
	 * @param scope - The scope to check
	 * @param action - The action to check
	 * @returns The permissions that the user has
	 */
	public async getPermission<T>(session_token: string, scope: string, action: string): Promise<Permission<T>> {
		const user = await this.getUser(session_token);
		const role_list = await roles.findMany({ _id: { $in: user.role_ids } });

		let permission: Permission<T> | undefined;

		try {
			permission = getPermission(
				[...role_list.flatMap(role => role.permissions), ...user.permissions] as Permission<unknown>[],
				scope,
				action,
			);
		}
		catch (e) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error getting permissions', { cause: e });
		}

		if (!permission || Object.keys(permission).length === 0) {
			throw new HttpException(HttpStatus.FORBIDDEN, 'User does not have permission');
		}

		return permission;
	}

	/**
	 * Gets a user by their session token
	 *
	 * @param session_token - The session token to look up
	 * @returns The user associated with the session token
	 * @throws {HttpException}
	 *   - UNAUTHORIZED if session not found
	 *   - UNAUTHORIZED if user not found
	 */
	public async getUser(session_token: string) {
		// TODO: Implement caching with redis

		const session = await sessions.findOne({ token: session_token });

		if (!session) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Session not found');
		}

		const user = await users.findOne({ _id: session.user_id });

		if (!user) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not found');
		}

		return user;
	}

	/**
	 * Login a user
	 *
	 * @param username - The username of the user
	 * @param password_hash - The password hash of the user, already hashed with bcrypt in client
	 * @returns The newly created session for the logged in user
	 * @throws {HttpException}
	 *   - UNAUTHORIZED if user not found or password is incorrect
	 *   - INTERNAL_SERVER_ERROR if login fails
	 */
	public async login(dto: LoginDto): Promise<Session> {
		// TODO: Implement caching with redis

		const user = await users.findByEmail(dto.email, true);

		if (!user) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not found');
		}

		const password_hash = await bcrypt.compare(dto.password, user.password_hash ?? '');

		if (!password_hash) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid password');
		}

		const session: Session = {
			_id: generateRandomString(),
			created_at: getUnixTimestamp(),
			token: generateRandomToken(),
			updated_at: getUnixTimestamp(),
			user_id: user._id.toString(),
		};

		const result = await sessions.insertOne(session);

		if (!result.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error logging in user');
		}

		return session;
	}

	/**
	 * Logout a user
	 *
	 * @param session_token - The session token to logout
	 */
	public async logout(session_token: string) {
		// TODO: Invalidate cache

		await sessions.deleteOne({ token: session_token });
	}

	public async register(createUserDto: CreateUserDto) {
		// Generate a verification token
		const verification_token = generateRandomToken();

		// Create user without password
		const userToCreate = {
			...createUserDto,
		};

		const result = await users.insertOne(userToCreate);

		const verification_token_result = await verificationTokens.insertOne({
			expires_at: getUnixTimestampFromJSDate(DateTime.now().plus({ days: 7 }).toJSDate()),
			token: verification_token,
			user_id: result.insertedId.toString(),
		});

		if (!result.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating user');
		}

		if (!verification_token_result.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating verification token');
		}

		emailProvider.send({
			html: `<p>Click the link below to verify your email: <a target="_blank" href="${process.env.NEXT_PUBLIC_URL}/verification?token=${verification_token}">Verify Email</a></p>`,
			subject: 'Verify your email',
			to: createUserDto.email,
		});
	}
}

export const authProvider = AsyncSingletonProxy(AuthProvider);
