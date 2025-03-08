import { organizations } from '@/interfaces';
import { HttpException, HttpStatus } from '@/lib';
import { CreateOrganizationDto } from '@/types';

const newOrganization: CreateOrganizationDto = {
	code: 'ORG_1',
	name: 'Organization test',
};

describe('OrganizationsClass', () => {
	afterAll(async () => {
		await organizations.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new organization', async () => {
			const result = await organizations.insertOne(newOrganization);
			expect(result.insertedId).toBeDefined();

			const insertedOrganization = await organizations.findByCode(newOrganization.code);
			expect(insertedOrganization).toBeDefined();
			expect(insertedOrganization?.name).toBe(newOrganization.name);
		});

		it('should throw an error if the organization already exists', async () => {
			await expect(organizations.insertOne(newOrganization)).rejects.toThrow();
		});
	});

	describe('findByCode', () => {
		it('should find an organization by its code', async () => {
			const organization = await organizations.findByCode(newOrganization.code);
			expect(organization?.code).toBe(newOrganization.code);
		});

		it('should return null if the organization is not found', async () => {
			const organization = await organizations.findByCode('NON_EXISTENT_CODE');
			expect(organization).toBeNull();
		});
	});

	describe('updateByCode', () => {
		it('should update an organization\'s name', async () => {
			const updatedFields = { name: 'Updated Organization Name' };
			const updateResult = await organizations.updateByCode(newOrganization.code, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedOrganization = await organizations.findByCode(newOrganization.code);
			expect(updatedOrganization?.name).toBe(updatedFields.name);
		});

		it('should return modifiedCount as 0 if the organization does not exist', async () => {
			const updateResult = await organizations.updateByCode('NON_EXISTENT_CODE', { name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		it('should throw HttpException', async () => {
			await expect(organizations.updateMany()).rejects.toThrow(new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for organizations'));
		});
	});

	describe('deleteOne', () => {
		it('should delete an organization', async () => {
			const result = await organizations.deleteOne({ code: newOrganization.code });
			expect(result.deletedCount).toBe(1);

			const deletedOrganization = await organizations.findByCode(newOrganization.code);
			expect(deletedOrganization).toBeNull();
		});

		it('should return deletedCount as 0 if the organization does not exist', async () => {
			const result = await organizations.deleteOne({ code: 'NON_EXISTENT_CODE' });
			expect(result.deletedCount).toBe(0);
		});
	});
});
