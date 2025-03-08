import { stops } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateStopDto } from '@/types';
import { mockStops } from '@test/data/db-mock';

const newStop: CreateStopDto = {
	...mockStops[0],
	_id: '123456',
};

describe('StopsClass', () => {
	afterAll(async () => {
		await stops.disconnect();
	});

	describe('findById', () => {
		it('should find a stop by its _id', async () => {
			const stop = await stops.findById(mockStops[0]._id);
			expect(stop?._id).toBe(mockStops[0]._id);
		});

		it('should return undefined if the stop is not found', async () => {
			const stop = await stops.findById('999999');
			expect(stop).toBeNull();
		});
	});

	describe('findManyByIds', () => {
		it('should find multiple stops by their ids', async () => {
			const ids = [mockStops[0]._id, mockStops[1]._id];
			const result = await stops.findManyByIds(ids);
			expect(result.length).toBe(2);
			const foundIds = result.map(stop => stop._id);
			expect(foundIds).toContain(mockStops[0]._id);
			expect(foundIds).toContain(mockStops[1]._id);
		});

		it('should return only existing stops when some ids do not exist', async () => {
			const ids = [mockStops[0]._id, '090909'];
			const result = await stops.findManyByIds(ids);
			expect(result.length).toBe(1);
			expect(result[0]._id).toBe(mockStops[0]._id);
		});

		it('should return an empty array if no ids match', async () => {
			const ids = ['090909', '909090'];
			const result = await stops.findManyByIds(ids);
			expect(result).toEqual([]);
		});
	});

	describe('updateById', () => {
		it('should update a stop by its code', async () => {
			const code = mockStops[0]._id;
			const updateFields = { name: 'Updated Stop Name' };
			const updateResult = await stops.updateById(code, updateFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedStop = await stops.findById(code);
			expect(updatedStop?.name).toBe('Updated Stop Name');
		});

		it('should return modifiedCount as 0 if the stop does not exist', async () => {
			const code = '000000';
			const updateFields = { name: 'Should Not Update' };
			const updateResult = await stops.updateById(code, updateFields);
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should handle partial updates correctly', async () => {
			const code = mockStops[1]._id;
			const originalStop = await stops.findById(code);
			const updateFields = { locality_id: 'Updated Locality' };
			const updateResult = await stops.updateById(code, updateFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedStop = await stops.findById(code);
			expect(updatedStop?.locality_id).toBe('Updated Locality');
			// Ensure other fields remain unchanged
			expect(updatedStop?.name).toBe(originalStop?.name);
		});
	});

	describe('updateMany', () => {
		it('should update all stops', async () => {
			const updateResult = await stops.updateMany({}, { bench_status: 'is_damaged' });
			expect(updateResult.modifiedCount).toEqual((await stops.all()).length);
		});

		it('should return modifiedCount as 0 if no stops match the filter', async () => {
			const updateResult = await stops.updateMany({ _id: 'NON_EXISTENT_ID' }, { bench_status: 'is_damaged' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(stops.updateMany({}, { bench_status: 1 as unknown as 'is_damaged' | 'is_missing' | 'is_ok' | 'not_applicable' | 'unknown' }))
				.rejects.toThrow(HttpException);
		});
	});

	describe('findAll', () => {
		it('should find all stops', async () => {
			const result = await stops.all();
			expect(result.length).toBe(mockStops.length);
		});
	});

	describe('insertOne', () => {
		afterAll(async () => {
			await stops.deleteOne({ _id: newStop._id });
		});

		it('should insert a stop', async () => {
			const result = await stops.insertOne(newStop);
			expect(result.insertedId).toBeDefined();

			const insertedStop = await stops.findById(newStop._id);

			expect(insertedStop).toBeDefined();

			// compare all properties except created_at, updated_at and Id
			if (insertedStop) {
				const { created_at, updated_at, ...rest } = insertedStop;
				expect(created_at).toBeDefined();
				expect(updated_at).toBeDefined();
				expect(insertedStop._id).toBeDefined();
				expect(rest).toEqual(newStop);
			}
			else {
				fail('Inserted stop is undefined');
			}
		});

		it('should throw an error if the stop already exists', async () => {
			const newStop = mockStops[0];
			await expect(stops.insertOne(newStop)).rejects.toThrow();
		});
	});

	describe('deleteOne', () => {
		beforeAll(async () => {
			await stops.insertOne(newStop);
		});

		it('should delete a stop', async () => {
			const result = await stops.deleteOne({ _id: newStop._id });
			expect(result.deletedCount).toBe(1);

			const count = await stops.count();
			expect(count).toBe(mockStops.length);
		});

		it('it should return deletedCount as 0 if the stop does not exist', async () => {
			const result = await stops.deleteOne({ _id: 'NON_EXISTENT_ID' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		it('should delete multiple stops', async () => {
			const result = await stops.deleteMany({});
			expect(result.deletedCount).toBe(mockStops.length);
		});

		it('should return deletedCount as 0 if no stops match the filter', async () => {
			const result = await stops.deleteMany({ code: 'NON_EXISTENT_CODE' });
			expect(result.deletedCount).toBe(0);
		});
	});
});
