import { hashedTrips } from '@/interfaces/index.js';
import { HttpException } from '@tmlmobilidade/lib';
import { CreateHashedTripDto } from '@tmlmobilidade/types';

const newHashedTrip: CreateHashedTripDto = {
	_id: 'hashed_trip_1',
	agency_id: 'agency_1',
	line_id: 'line_1',
	line_long_name: 'Long Line Name',
	line_short_name: 'Short Line Name',
	path: [
		{
			arrival_time: '10:00:00',
			departure_time: '10:05:00',
			drop_off_type: 'regular',
			pickup_type: 'regular',
			shape_dist_traveled: 0,
			stop_id: 'stop_1',
			stop_lat: '38.79627920200005',
			stop_lon: '-9.23542624099997',
			stop_name: 'Stop 1',
			stop_sequence: 1,
			timepoint: 'true',
		},
	],
	pattern_id: 'pattern_1',
	route_color: '#FF0000',
	route_id: 'route_1',
	route_long_name: 'Long Route Name',
	route_short_name: 'Short Route Name',
	route_text_color: '#FFFFFF',
	trip_headsign: 'Trip Head Sign',
};

let hashedTripId: string;

describe('HashedTripsClass', () => {
	afterAll(async () => {
		await hashedTrips.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new hashed trip', async () => {
			const result = await hashedTrips.insertOne(newHashedTrip);
			expect(result.insertedId).toBeDefined();
			hashedTripId = result.insertedId.toString();

			const insertedTrip = await hashedTrips.findById(hashedTripId);
			expect(insertedTrip).toBeDefined();
			expect(insertedTrip?.agency_id).toBe(newHashedTrip.agency_id);
		});

		it('should throw an error if the hashed trip already exists', async () => {
			await expect(hashedTrips.insertOne(newHashedTrip)).rejects.toThrow();
		});
	});

	describe('findByCode', () => {
		it('should find a hashed trip by its code', async () => {
			const trip = await hashedTrips.findById(hashedTripId);
			expect(trip?.agency_id).toBe(newHashedTrip.agency_id);
		});

		it('should return null if the hashed trip is not found', async () => {
			const trip = await hashedTrips.findById('NON_EXISTENT_CODE');
			expect(trip).toBeNull();
		});
	});

	describe('updateByCode', () => {
		it('should update a hashed trip', async () => {
			const updatedFields = { line_long_name: 'Updated Long Line Name' };
			const updateResult = await hashedTrips.updateById(hashedTripId, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedTrip = await hashedTrips.findById(hashedTripId);
			expect(updatedTrip?.line_long_name).toBe('Updated Long Line Name');
		});

		it('should return null if the hashed trip is not found', async () => {
			const updateResult = await hashedTrips.updateById('NON_EXISTENT_CODE', { line_long_name: 'Updated Long Line Name' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		// it('should update all hashed trips', async () => {
		// 	const updateResult = await hashedTrips.updateMany({}, { line_long_name: 'Updated Long Line Name' });
		// 	expect(updateResult.modifiedCount).toEqual((await hashedTrips.all()).length);
		// });

		it('should return modifiedCount as 0 if no hashed trips match the filter', async () => {
			const updateResult = await hashedTrips.updateMany({ _id: 'NON_EXISTENT_CODE' }, { line_long_name: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(hashedTrips.updateMany({}, { line_long_name: 1 as unknown as string }))
				.rejects.toThrow(HttpException);
		});
	});
});
