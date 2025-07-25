/* * */

import { roles, sessions, users, verificationTokens } from '@/interfaces/index.js';
import { sendWelcomeEmail } from '@tmlmobilidade/emails';
import { getAppConfig, HttpException, HttpStatus } from '@tmlmobilidade/lib';
import { type CreateUserDto, type LoginDto, type Permission, type Session } from '@tmlmobilidade/types';
import { AsyncSingletonProxy, Dates, generateRandomString, generateRandomToken, getPermission } from '@tmlmobilidade/utils';
import bcrypt from 'bcryptjs';

/* * */

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
	 * Get Permissions for a user based on their session token.
	 * @param sessionToken - The session token
	 * @param scope - The scope to check
	 * @param action - The action to check
	 * @returns The permissions that the user has
	 */
	public async getPermission<T>(sessionToken: string, scope: string, action: string): Promise<Permission<T>> {
		//

		//
		// Get the user and their roles

		const userData = await this.getUser(sessionToken);
		const rolesData = await roles.findMany({ _id: { $in: userData.role_ids } });

		//
		// Build the permissions list

		let permission: Permission<T> | undefined;

		try {
			// Combine permissions from associated roles
			// and user-specific permissions
			const combinedPermissions = [
				...rolesData.flatMap(role => role.permissions),
				...userData.permissions,
			] as Permission<unknown>[];
			// Get the permission for the requested scope and action
			permission = getPermission(combinedPermissions, scope, action);
		}
		catch (e) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error getting permissions', { cause: e });
		}

		//
		// If no permission found, throw an error

		if (!permission || Object.keys(permission).length === 0) {
			throw new HttpException(HttpStatus.FORBIDDEN, 'User does not have permission');
		}

		//
		// Else, return the permission

		return permission;
	}

	/**
	 * Gets a user by their session token.
	 * @param sessionToken The session token to look up.
	 * @returns The user associated with the session token.
	 * @throws An HTTP UNAUTHORIZED error code if user or session not found
	 */
	public async getUser(sessionToken: string) {
		//

		//
		// Find the current session in the database

		const sessionData = await sessions.findOne({ token: { $eq: sessionToken } });

		if (!sessionData) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Session not found');
		}

		//
		// Find the user associated with the session

		const userData = await users.findOne({ _id: { $eq: sessionData.user_id } });

		if (!userData) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not found');
		}

		//
		// Return the user data to the caller

		return userData;
	}

	/**
	 * Login a user.
	 * @param username The username of the user
	 * @param password_hash The password hash of the user, already hashed with bcrypt in client
	 * @returns The newly created session for the logged in user
	 * @throws An HTTP error code:
	 *   - UNAUTHORIZED if user not found or password is incorrect
	 *   - INTERNAL_SERVER_ERROR if login fails
	 */
	public async login(loginDto: LoginDto): Promise<Session> {
		//

		//
		// Find the user by email

		const userData = await users.findByEmail(loginDto.email, true);

		if (!userData) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'User not found');
		}

		//
		// Check if the password matches the stored hash

		const passwordHashMatch = await bcrypt.compare(loginDto.password, userData.password_hash ?? '');

		if (!passwordHashMatch) {
			throw new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid password');
		}

		//
		// Create a new session object if the password matches

		const session: Session = {
			_id: generateRandomString(),
			created_at: Dates.now('utc').unix_timestamp,
			token: generateRandomToken(),
			updated_at: Dates.now('utc').unix_timestamp,
			user_id: userData._id.toString(),
		};

		const insertResult = await sessions.insertOne(session);

		if (!insertResult.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error logging in user');
		}

		//
		// Return the session to the caller

		return session;
	}

	/**
	 * Logout a user by removing their session.
	 * @param sessionToken The session token to logout.
	 */
	public async logout(sessionToken: string) {
		await sessions.deleteOne({ token: { $eq: sessionToken } });
	}

	/**
	 * Register a new user.
	 * @param createUserDto The data to create the user
	 * @throws An HTTP error code:
	 *   - INTERNAL_SERVER_ERROR if user creation fails
	 */
	public async register(createUserDto: CreateUserDto) {
		//

		//
		// Insert the new user into the database
		// with the provided data

		const insertNewUserResult = await users.insertOne({ ...createUserDto });

		if (!insertNewUserResult.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating user');
		}

		//
		// Generate a random token that will be used to verify the user

		const verificationToken = generateRandomToken();

		const insertVerificationTokenResult = await verificationTokens.insertOne({
			expires_at: Dates.now('utc').plus({ days: 7 }).unix_timestamp,
			token: verificationToken,
			user_id: insertNewUserResult.insertedId.toString(),
		});

		if (!insertVerificationTokenResult.acknowledged) {
			throw new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating verification token');
		}

		//
		// Send a welcome email to the user with the verification token

		sendWelcomeEmail({
			props: {
				first_name: createUserDto.first_name,
				setup_password_link: `${getAppConfig('auth', 'frontend_url')}/verification?token=${verificationToken}`,
			},
			to: createUserDto.email,
		});
	}
}

/* * */

export const authProvider = AsyncSingletonProxy(AuthProvider);
