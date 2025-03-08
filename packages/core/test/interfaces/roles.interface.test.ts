import { roles } from '@/interfaces';
import { HttpException, HttpStatus } from '@/lib';
import { CreateRoleDto } from '@/types';

const newRole: CreateRoleDto = {
	name: 'Admin',
	permissions: [],
};

let insertedRoleId: string;

describe('RolesClass', () => {
	afterAll(async () => {
		await roles.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new role', async () => {
			const result = await roles.insertOne(newRole);
			expect(result.insertedId).toBeDefined();

			insertedRoleId = result.insertedId.toString();

			const insertedRole = await roles.findById(insertedRoleId);
			expect(insertedRole).toBeDefined();
			expect(insertedRole?.name).toBe(newRole.name);
		});

		it('should throw an error if the role already exists', async () => {
			await expect(roles.insertOne(newRole)).rejects.toThrow();
		});
	});

	describe('findById', () => {
		it('should find a role by its ID', async () => {
			const role = await roles.findById(insertedRoleId);
			expect(role?._id.toString()).toBe(insertedRoleId);
		});

		it('should return null if the role is not found', async () => {
			const role = await roles.findById('NON_EXISTENT_ID');
			expect(role).toBeNull();
		});
	});

	describe('findByName', () => {
		it('should find a role by its name', async () => {
			const role = await roles.findByName(newRole.name);
			expect(role?.name).toBe(newRole.name);
		});

		it('should return null if the role is not found', async () => {
			const role = await roles.findByName('NON_EXISTENT_ROLE');
			expect(role).toBeNull();
		});
	});

	describe('updateById', () => {
		it('should update a role\'s name', async () => {
			const updatedFields = { name: 'Super Admin' };
			const updateResult = await roles.updateById(insertedRoleId, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedRole = await roles.findById(insertedRoleId);
			expect(updatedRole?.name).toBe(updatedFields.name);
		});

		it('should return modifiedCount as 0 if the role does not exist', async () => {
			const updateResult = await roles.updateById('NON_EXISTENT_ID', { name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		it('should throw HttpException', async () => {
			await expect(roles.updateMany()).rejects.toThrow(new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for roles'));
		});
	});

	describe('deleteOne', () => {
		it('should delete a role', async () => {
			const result = await roles.deleteOne({ _id: insertedRoleId });
			expect(result.deletedCount).toBe(1);

			const deletedRole = await roles.findById(insertedRoleId);
			expect(deletedRole).toBeNull();
		});

		it('should return deletedCount as 0 if the role does not exist', async () => {
			const result = await roles.deleteOne({ _id: 'NON_EXISTENT_ID' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		const rolesToDelete: CreateRoleDto[] = [
			{ name: 'Test Role 1', permissions: [] },
			{ name: 'Test Role 2', permissions: [] },
		];

		beforeAll(async () => {
			for (const role of rolesToDelete) {
				await roles.insertOne(role);
			}
		});

		it('should delete multiple roles', async () => {
			const result = await roles.deleteMany({ name: { $in: rolesToDelete.map(role => role.name) } });
			expect(result.deletedCount).toBe(rolesToDelete.length);
		});

		it('should return deletedCount as 0 if no roles match the filter', async () => {
			const result = await roles.deleteMany({ name: 'NON_EXISTENT_ROLE' });
			expect(result.deletedCount).toBe(0);
		});
	});
});
