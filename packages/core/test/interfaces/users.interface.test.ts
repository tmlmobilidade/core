import { users } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateUserDto, Email } from '@/types';
import { generateRandomString } from '@/utils';
import { mockUsers } from '@test/data/db-mock';
import { Sort } from 'mongodb';

const newUser: CreateUserDto = {
	...mockUsers[0],
	email: 'newuser@example.com' as Email,
};

let insertedUserId: string;

describe('UsersClass', () => {
	afterAll(async () => {
		await users.disconnect();
	});

	describe('findByEmail', () => {
		it('should find a user by their email', async () => {
			const user = await users.findByEmail(mockUsers[0].email);
			expect(user?.email).toBe(mockUsers[0].email);

			expect(user?.password_hash).toBeUndefined();
		});

		it('should return null if the user is not found', async () => {
			const user = await users.findByEmail('nonexistent@example.com');
			expect(user).toBeNull();
		});
	});

	describe('findById', () => {
		it('should find a user by their ID', async () => {
			const id = (await users.findMany())[0]._id;

			const user = await users.findById(id);
			expect(user?._id).toEqual(id);

			expect(user?.password_hash).toBeUndefined();
		});

		it('should return null if the ID does not exist', async () => {
			const user = await users.findById('NON_EXISTENT_ID');
			expect(user).toBeNull();
		});
	});

	describe('findByOrganization', () => {
		it('should find users by organization code', async () => {
			const organizationCode = mockUsers[0].organization_ids[0];
			const result = await users.findByOrganization(organizationCode);

			expect(result).toBeDefined();
			expect(result.length).toBeGreaterThan(0);
			result.forEach((user) => {
				const orgIds = mockUsers[0].organization_ids.map(id => id.toString());
				const matches = user.organization_ids.some(id => orgIds.includes(id.toString()));
				expect(matches).toBe(true);
			});

			result.forEach((user) => {
				expect(user['password_hash']).toBeUndefined();
			});
		});

		it('should return an empty array if no users are found for the organization code', async () => {
			const organizationCode = generateRandomString({ length: 10 });
			const result = await users.findByOrganization(organizationCode);
			expect(result).toEqual([]);
		});
	});

	describe('findByRole', () => {
		it('should find users by their role ID', async () => {
			const roleId = mockUsers[0].role_ids[0];
			const result = await users.findByRole(roleId);

			expect(result).toBeDefined();
			expect(result.length).toBeGreaterThan(0);
			result.forEach((user) => {
				expect(user.role_ids.map(id => id.toString())).toContain(roleId);
			});

			result.forEach((user) => {
				expect(user['password_hash']).toBeUndefined();
			});
		});

		it('should return an empty array if no users have the specified role', async () => {
			const roleId = generateRandomString({ length: 10 });
			const result = await users.findByRole(roleId);
			expect(result).toEqual([]);
		});
	});

	describe('findMany', () => {
		it('should find users with pagination and sorting', async () => {
			const sort: Sort = { email: 1 };
			const perPage = 1;
			const page = 1;
			const result = await users.findMany({}, perPage, page, sort);
			expect(result.length).toBeLessThanOrEqual(perPage);

			result.forEach((user) => {
				expect(user['password_hash']).toBeUndefined();
			});
		});

		it('should return an empty array if no users match the filter', async () => {
			const filter = { email: 'nonexistent@example.com' as Email };
			const result = await users.findMany(filter);
			expect(result).toEqual([]);
		});
	});

	describe('updateMany', () => {
		it('should update all stops', async () => {
			const updateResult = await users.updateMany({}, { first_name: 'Updated First Name' });
			expect(updateResult.modifiedCount).toEqual((await users.all()).length);
		});

		it('should return modifiedCount as 0 if no stops match the filter', async () => {
			const updateResult = await users.updateMany({ _id: 'NON_EXISTENT_ID' }, { first_name: 'Updated First Name' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(users.updateMany({}, { email: 1 as unknown as string }))
				.rejects.toThrow(HttpException);
		});
	});

	describe('findOne', () => {
		it('should find a single user matching the filter', async () => {
			const filter = { email: mockUsers[0].email };
			const user = await users.findOne(filter);
			expect(user?.email).toBe(mockUsers[0].email);

			expect(user?.password_hash).toBeUndefined();
		});

		it('should return null if no user matches the filter', async () => {
			const filter = { email: 'nonexistent@example.com' as Email };
			const user = await users.findOne(filter);
			expect(user).toBeNull();
		});
	});

	describe('insertOne', () => {
		afterAll(async () => {
			await users.deleteOne({ _id: insertedUserId });
		});

		it('should insert a new user', async () => {
			const result = await users.insertOne(newUser);
			insertedUserId = result.insertedId.toString();
			expect(result.insertedId).toBeDefined();

			const insertedUser = await users.findById(insertedUserId);
			expect(insertedUser).toBeDefined();
			expect(insertedUser?.email).toBe(newUser.email);
			expect(insertedUser?.password_hash).toBeUndefined();
		});

		it('should throw an error if the user already exists', async () => {
			const existingUser = mockUsers[0];
			await expect(users.insertOne(existingUser)).rejects.toThrow();
		});
	});

	describe('updateOne', () => {
		beforeAll(async () => {
			const result = await users.insertOne(newUser);
			insertedUserId = result.insertedId.toString();
		});

		it('should update a user\'s email', async () => {
			const updateFields = { email: 'updated_email@example.com' as Email };
			const updateResult = await users.updateById(insertedUserId, updateFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedUser = await users.findById(insertedUserId);
			expect(updatedUser?.email).toBe(updateFields.email);

			await users.updateById(insertedUserId, { email: `updated_${mockUsers[0].email}` as Email });
		});

		it('should return modifiedCount as 0 if the user does not exist', async () => {
			const updateFields = { email: 'nonexistent@example.com' as Email };
			const updateResult = await users.updateById('NON_EXISTENT_ID', updateFields);
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('deleteOne', () => {
		// beforeAll(async () => {
		// 	await users.insertOne(newUser);
		// });

		it('should delete a user', async () => {
			const result = await users.deleteOne({ _id: insertedUserId });
			expect(result.deletedCount).toBe(1);

			const deletedUser = await users.findById(insertedUserId);
			expect(deletedUser).toBeNull();
		});

		it('should return deletedCount as 0 if the user does not exist', async () => {
			const result = await users.deleteOne({ _id: 'NON_EXISTENT_ID' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		const usersToDelete = mockUsers.map(user => ({
			...user,
			email: `delete_${user.email}` as Email,
		}));

		beforeAll(async () => {
			for (const user of usersToDelete) {
				await users.insertOne(user);
			}
		});

		it('should delete multiple users', async () => {
			const emails = usersToDelete.map(user => user.email as Email);
			const result = await users.deleteMany({ email: { $in: emails } });
			expect(result.deletedCount).toBe(usersToDelete.length);
		});

		it('should return deletedCount as 0 if no users match the filter', async () => {
			const result = await users.deleteMany({ email: 'nonexistent@example.com' as Email });
			expect(result.deletedCount).toBe(0);
		});
	});
});
