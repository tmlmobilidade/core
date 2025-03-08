/**
 * Unit tests for authProvider
 */

import { roles, sessions, users } from '@/interfaces';
import HttpException from '@/lib/http-exception';
import HttpStatus from '@/lib/http-status';
import { authProvider } from '@/providers';
import { Email, LoginDto, Session } from '@/types';
import { mockUsers } from '@test/data/db-mock';
import bcrypt from 'bcryptjs';

// Mock bcrypt
jest.mock('bcryptjs');

describe('authProvider', () => {
	let user_id: string;

	beforeAll(async () => {
		const result = await users.findMany();
		user_id = result[0]._id.toString();
	});

	beforeEach(async () => {
		// Clear the sessions collection before each test
		await sessions.deleteMany({});
	});

	afterAll(async () => {
		// Disconnect from the database after all tests
		await sessions.deleteMany({});
		await sessions.disconnect();
		await users.disconnect();
		await roles.disconnect();
	});

	describe('login', () => {
		const validEmail = mockUsers[0].email;
		const validPassword = 'validPassword';
		const invalidPassword = 'invalidPassword';

		beforeAll(() => {
			// Mock bcrypt.compare
			(bcrypt.compare as jest.Mock).mockImplementation((password: string, hash: string) => {
				return password === validPassword && hash === 'hashedPassword';
			});
		});

		it('should create a new session for valid credentials', async () => {
			// Arrange
			const loginDto: LoginDto = {
				email: validEmail,
				password: validPassword,
			};

			// Act
			const session: Session = await authProvider.login(loginDto);

			// Assert
			expect(session).toBeDefined();
			expect(session.token).toBeDefined();
			expect(session.user_id).toBeDefined();

			// Verify the session is stored in the database
			const storedSession = await sessions.findOne({ token: session.token });
			expect(storedSession).toBeDefined();

			// Cannot compare ObjectId directly, so we compare the string representations
			expect(storedSession?.user_id.toString()).toBe(session.user_id.toString());
		});

		it('should throw UNAUTHORIZED if user is not found', async () => {
			// Arrange
			const loginDto: LoginDto = {
				email: 'nonexistent@example.com' as Email,
				password: validPassword,
			};

			// Act & Assert
			await expect(authProvider.login(loginDto)).rejects.toThrow(
				new HttpException(HttpStatus.UNAUTHORIZED, 'User not found'),
			);
		});

		it('should throw UNAUTHORIZED if password is incorrect', async () => {
			// Arrange
			const loginDto: LoginDto = {
				email: validEmail,
				password: invalidPassword,
			};

			// Act & Assert
			await expect(authProvider.login(loginDto)).rejects.toThrow(
				new HttpException(HttpStatus.UNAUTHORIZED, 'Invalid password'),
			);
		});
	});

	describe('logout', () => {
		it('should delete the session', async () => {
			// Arrange
			const session = {
				token: 'test-token',
				user_id,
			};

			const result = await sessions.insertOne(session);
			expect(result.acknowledged).toBe(true);

			// Act
			await authProvider.logout(session.token);

			// Assert
			const storedSession = await sessions.findOne({ token: session.token });
			expect(storedSession).toBeNull();
		});
	});

	describe('getUser', () => {
		it('should return the user associated with the session', async () => {
			const session = {
				token: 'test-token',
				user_id: 'mock-user-id',
			};

			await users.insertOne({ ...mockUsers[0], _id: session.user_id, email: 'temp@example.com' as Email });
			await sessions.insertOne(session);

			const user = await authProvider.getUser(session.token);
			expect(user).toBeDefined();
			expect(user._id).toBe(session.user_id);
			expect(user.email).toBe('temp@example.com');
		});
	});

	// ! TODO: FIX
	// describe('getPermissions', () => {
	// 	const sessionToken = 'test-token';

	// 	afterEach(async () => {
	// 		await sessions.deleteOne({ token: sessionToken });
	// 	});

	// 	it('should return the permissions if the user with no permissions but with role that has the permission', async () => {
	// 		const session = {
	// 			token: sessionToken,
	// 			user_id,
	// 		};

	// 		await sessions.insertOne(session);

	// 		const user = await users.findById(user_id);

	// 		expect(user).toBeDefined();
	// 		expect(user?.role_ids[0]).toBe(mockRoles[0].name);
	// 		expect(user?.permissions.length).toBe(0);

	// 		const permissions = await authProvider.getPermissions(session.token, mockRoles[0].permissions[0].scope, mockRoles[0].permissions[0].action);
	// 		expect(permissions).toBeDefined();
	// 		expect(Object.keys(permissions).length).toBeGreaterThanOrEqual(1);
	// 	});

	// 	it('should return the permissions if the user with permissions and no role has the permission', async () => {
	// 		const session = {
	// 			token: sessionToken,
	// 			user_id,
	// 		};

	// 		await sessions.insertOne(session);

	// 		const user = await users.findById(user_id);
	// 		expect(user).toBeDefined();
	// 		expect(user?.role_ids.length).toBe(0);
	// 		expect(user?.permissions.length).toBeGreaterThan(0);

	// 		const permissions = await authProvider.getPermissions(session.token, mockPermissions[1].scope, mockPermissions[1].action);
	// 		expect(permissions).toBeDefined();
	// 		expect(Object.keys(permissions).length).toBeGreaterThanOrEqual(1);
	// 	});

	// 	it('should throw FORBIDDEN if the user does not have the permission', async () => {
	// 		const session = {
	// 			token: sessionToken,
	// 			user_id,
	// 		};

	// 		await sessions.insertOne(session);

	// 		await expect(authProvider.getPermissions(session.token, mockPermissions[0].scope, mockPermissions[0].action)).rejects.toThrow(
	// 			new HttpException(HttpStatus.FORBIDDEN, 'User does not have permission'),
	// 		);
	// 	});

	// 	it('should return the merged permissions if the user has permissions and roles', async () => {
	// 		const session = {
	// 			token: sessionToken,
	// 			user_id,
	// 		};

	// 		await sessions.insertOne(session);

	// 		const permissions = await authProvider.getPermissions(session.token, mockRoles[1].permissions[0].scope, mockRoles[1].permissions[0].action);

	// 		expect(permissions).toBeDefined();
	// 		expect(Object.keys(permissions).length).toBeGreaterThanOrEqual(1);
	// 		// TODO: Fix _id buffer issue
	// 		expect({ ...permissions, _id: undefined }).toEqual({ ...mockPermissions[4], _id: undefined });
	// 	});
	// });
});
