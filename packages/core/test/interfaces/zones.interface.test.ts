import { zones } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateZoneDto } from '@/types';

const newZone: CreateZoneDto = {
	border_color: '#000000',
	border_opacity: 1,
	border_width: 1,
	code: 'ZONE_1',
	fill_color: '#000000',
	fill_opacity: 1,
	geojson: { features: [], type: 'FeatureCollection' },
	is_locked: false,
	name: 'Zone 1',
};

describe('ZonesClass', () => {
	afterAll(async () => {
		await zones.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new zone', async () => {
			const result = await zones.insertOne(newZone);
			expect(result.insertedId).toBeDefined();

			const insertedZone = await zones.findByCode(newZone.code);
			expect(insertedZone).toBeDefined();
			expect(insertedZone?.name).toBe(newZone.name);
		});

		it('should throw an error if the zone already exists', async () => {
			await expect(zones.insertOne(newZone)).rejects.toThrow();
		});
	});

	describe('findByCode', () => {
		it('should find a zone by its code', async () => {
			const zone = await zones.findByCode(newZone.code);
			expect(zone?.code).toBe(newZone.code);
		});

		it('should return null if the zone is not found', async () => {
			const zone = await zones.findByCode('NON_EXISTENT_CODE');
			expect(zone).toBeNull();
		});
	});

	describe('findByName', () => {
		it('should find a zone by its name', async () => {
			const zone = await zones.findByName(newZone.name);
			expect(zone?.name).toBe(newZone.name);
		});
	});

	describe('updateByCode', () => {
		it('should update a zone\'s name', async () => {
			const updatedFields = { name: 'Updated Zone Name' };
			const updateResult = await zones.updateByCode(newZone.code, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedZone = await zones.findByCode(newZone.code);
			expect(updatedZone?.name).toBe(updatedFields.name);
		});

		it('should return modifiedCount as 0 if the zone does not exist', async () => {
			const updateResult = await zones.updateByCode('NON_EXISTENT_CODE', { name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		// it('should update all stops', async () => {
		// 	const updateResult = await zones.updateMany({}, { name: 'Updated Zone Name' });
		// 	expect(updateResult.modifiedCount).toEqual((await zones.all()).length);
		// });

		it('should return modifiedCount as 0 if no stops match the filter', async () => {
			const updateResult = await zones.updateMany({ _id: 'NON_EXISTENT_ID' }, { name: 'Updated Zone Name' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(zones.updateMany({}, { name: 1 as unknown as string }))
				.rejects.toThrow(HttpException);
		});
	});

	describe('deleteOne', () => {
		it('should delete a zone', async () => {
			const result = await zones.deleteOne({ code: newZone.code });
			expect(result.deletedCount).toBe(1);

			const deletedZone = await zones.findByCode(newZone.code);
			expect(deletedZone).toBeNull();
		});

		it('should return deletedCount as 0 if the zone does not exist', async () => {
			const result = await zones.deleteOne({ code: 'NON_EXISTENT_CODE' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		const zonesToDelete: CreateZoneDto[] = [
			{ ...newZone, code: 'ZONE_2' },
			{ ...newZone, code: 'ZONE_3' },
		];

		beforeAll(async () => {
			for (const zone of zonesToDelete) {
				await zones.insertOne(zone);
			}
		});

		it('should delete multiple zones', async () => {
			const result = await zones.deleteMany({ code: { $in: zonesToDelete.map(zone => zone.code) } });
			expect(result.deletedCount).toBe(zonesToDelete.length);
		});

		it('should return deletedCount as 0 if the zones do not exist', async () => {
			const result = await zones.deleteMany({ code: { $in: ['NON_EXISTENT_CODE_1', 'NON_EXISTENT_CODE_2'] } });
			expect(result.deletedCount).toBe(0);
		});
	});
});
