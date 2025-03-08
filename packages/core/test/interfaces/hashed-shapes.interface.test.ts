import { hashedShapes } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateHashedShapeDto } from '@/types';

const newHashedShape: CreateHashedShapeDto = {
	_id: 'hashed_shape_1',
	agency_id: 'agency_1',
	points: [
		{ shape_dist_traveled: 0, shape_pt_lat: '38.79627920200005', shape_pt_lon: '-9.23542624099997', shape_pt_sequence: 1 },
		{ shape_dist_traveled: 1, shape_pt_lat: '38.79641254500007', shape_pt_lon: '-9.235565959999974', shape_pt_sequence: 2 },
	],
};

let hashedShapeId: string;

describe('HashedShapesClass', () => {
	afterAll(async () => {
		await hashedShapes.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new hashed shape', async () => {
			const result = await hashedShapes.insertOne(newHashedShape);
			expect(result.insertedId).toBeDefined();
			hashedShapeId = result.insertedId.toString();

			const insertedShape = await hashedShapes.findById(hashedShapeId);
			expect(insertedShape).toBeDefined();
			expect(insertedShape?.agency_id).toBe(newHashedShape.agency_id);
		});

		it('should throw an error if the hashed shape already exists', async () => {
			await expect(hashedShapes.insertOne(newHashedShape)).rejects.toThrow();
		});
	});

	describe('findByCode', () => {
		it('should find a hashed shape by its code', async () => {
			const shape = await hashedShapes.findById(hashedShapeId);
			expect(shape?.agency_id).toBe(newHashedShape.agency_id);
		});

		it('should return null if the hashed shape is not found', async () => {
			const shape = await hashedShapes.findById('NON_EXISTENT_CODE');
			expect(shape).toBeNull();
		});
	});

	describe('updateByCode', () => {
		it('should update a hashed shape', async () => {
			const updatedFields = { agency_id: 'updated_agency' };
			const updateResult = await hashedShapes.updateById(hashedShapeId, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedShape = await hashedShapes.findById(hashedShapeId);
			expect(updatedShape?.agency_id).toBe(updatedFields.agency_id);
		});

		it('should return modifiedCount as 0 if the hashed shape does not exist', async () => {
			const updateResult = await hashedShapes.updateById('NON_EXISTENT_CODE', { agency_id: 'should_not_update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		// it('should update all hashed shapes', async () => {
		// 	const updateResult = await hashedShapes.updateMany({}, { agency_id: 'updated_agency' });
		// 	expect(updateResult.modifiedCount).toEqual((await hashedShapes.all()).length);
		// });

		it('should return modifiedCount as 0 if no hashed shapes match the filter', async () => {
			const updateResult = await hashedShapes.updateMany({ _id: 'NON_EXISTENT_CODE' }, { agency_id: 'should_not_update' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(hashedShapes.updateMany({}, { agency_id: 1 as unknown as string }))
				.rejects.toThrow(HttpException);
		});
	});

	describe('deleteOne', () => {
		it('should delete a hashed shape', async () => {
			const result = await hashedShapes.deleteOne({ _id: hashedShapeId });
			expect(result.deletedCount).toBe(1);

			const deletedShape = await hashedShapes.findById(hashedShapeId);
			expect(deletedShape).toBeNull();
		});

		it('should return deletedCount as 0 if the hashed shape does not exist', async () => {
			const result = await hashedShapes.deleteOne({ code: 'NON_EXISTENT_CODE' });
			expect(result.deletedCount).toBe(0);
		});
	});
});
