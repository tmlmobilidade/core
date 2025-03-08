import { municipalities } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateMunicipalityDto } from '@/types';

const newMunicipality: CreateMunicipalityDto = {
	border_color: '',
	border_opacity: 0,
	border_width: 0,
	code: 'NEW_MUNICIPALITY',
	district: '',
	fill_color: '',
	fill_opacity: 0,
	geojson: { features: [], type: 'FeatureCollection' }, // Assuming a valid GeoJSON structure
	is_locked: false,
	name: 'New Municipality',
	prefix: 'NM',
	region: '',
};

describe('MunicipalitiesClass', () => {
	afterAll(async () => {
		await municipalities.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new municipality', async () => {
			const result = await municipalities.insertOne(newMunicipality);
			expect(result.insertedId).toBeDefined();

			const insertedMunicipality = await municipalities.findByCode(newMunicipality.code);
			expect(insertedMunicipality).toBeDefined();
			expect(insertedMunicipality?.name).toBe(newMunicipality.name);
		});

		it('should throw an error if the municipality already exists', async () => {
			await expect(municipalities.insertOne(newMunicipality)).rejects.toThrow();
		});
	});

	describe('findByCode', () => {
		it('should find a municipality by its code', async () => {
			const municipality = await municipalities.findByCode(newMunicipality.code);
			expect(municipality?.code).toBe(newMunicipality.code);
		});

		it('should return null if the municipality is not found', async () => {
			const municipality = await municipalities.findByCode('NON_EXISTENT_CODE');
			expect(municipality).toBeNull();
		});
	});

	describe('updateByCode', () => {
		it('should update a municipality\'s name', async () => {
			const updatedFields = { name: 'Updated Municipality Name' };
			const updateResult = await municipalities.updateByCode(newMunicipality.code, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedMunicipality = await municipalities.findByCode(newMunicipality.code);
			expect(updatedMunicipality?.name).toBe(updatedFields.name);
		});

		it('should return modifiedCount as 0 if the municipality does not exist', async () => {
			const updateResult = await municipalities.updateByCode('NON_EXISTENT_CODE', { name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('deleteOne', () => {
		it('should delete a municipality', async () => {
			const result = await municipalities.deleteOne({ code: newMunicipality.code });
			expect(result.deletedCount).toBe(1);

			const deletedMunicipality = await municipalities.findByCode(newMunicipality.code);
			expect(deletedMunicipality).toBeNull();
		});

		it('should return deletedCount as 0 if the municipality does not exist', async () => {
			const result = await municipalities.deleteOne({ code: 'NON_EXISTENT_CODE' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		it('should update all municipalities', async () => {
			const updateResult = await municipalities.updateMany({}, { name: 'Updated Municipality Name' });
			expect(updateResult.modifiedCount).toEqual((await municipalities.all()).length);
		});

		it('should return modifiedCount as 0 if no municipalities match the filter', async () => {
			const updateResult = await municipalities.updateMany({ code: 'NON_EXISTENT_CODE' }, { name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(municipalities.updateMany({}, { name: 1 as unknown as string }))
				.rejects.toThrow(HttpException);
		});
	});
});
