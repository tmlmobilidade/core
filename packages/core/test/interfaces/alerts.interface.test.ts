import { alerts } from '@/interfaces';
import { HttpException } from '@/lib';
import { CreateAlertDto } from '@/types';

const newAlert: CreateAlertDto = {
	active_period_end_date: undefined,
	active_period_start_date: new Date(),
	cause: 'UNKNOWN_CAUSE',
	created_by: '1',
	description: 'Test Alert',
	effect: 'NO_SERVICE',
	file_id: '',
	info_url: 'http://example.com/info.html',
	modified_by: '1',
	municipality_ids: ['municipality_1'],
	publish_end_date: undefined,
	publish_start_date: new Date(),
	publish_status: 'PUBLISHED',
	reference_type: 'LINE',
	references: [
		{
			child_ids: [
				'120001',
				'120005',
				'120007',
			],
			parent_id: '1101_0',
		},
		{
			child_ids: [
				'070513',
				'060223',
				'070121',
			],
			parent_id: '2728_0',
		},
	],
	title: 'Test Alert Title',
	type: 'PLANNED',
};

let insertedAlertId: string;

describe('AlertsClass', () => {
	afterAll(async () => {
		await alerts.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new alert', async () => {
			const result = await alerts.insertOne(newAlert);
			expect(result.insertedId).toBeDefined();
			insertedAlertId = result.insertedId.toString();

			const insertedAlert = await alerts.findById(insertedAlertId);
			expect(insertedAlert).toBeDefined();
			expect(insertedAlert?.title).toBe(newAlert.title);
		});

		it('should create a new alert with a predefined _id', async () => {
			const predefinedId = 'predefined_id';
			const result = await alerts.insertOne({ ...newAlert, _id: predefinedId });

			expect(result.insertedId).toBeDefined();
			expect(result.insertedId.toString()).toEqual(predefinedId);
		});
	});

	describe('findByMunicipalityId', () => {
		it('should find alerts by municipality ID', async () => {
			const result = await alerts.findByMunicipalityId(newAlert.municipality_ids[0]);
			expect(result).toBeDefined();
			expect(result.length).toBeGreaterThan(0);
			result.forEach((alert) => {
				expect(alert.municipality_ids).toContain(newAlert.municipality_ids[0]);
			});
		});

		it('should return an empty array if no alerts are found for the municipality ID', async () => {
			const result = await alerts.findByMunicipalityId('NON_EXISTENT_MUNICIPALITY_ID');
			expect(result).toEqual([]);
		});
	});

	describe('findByTitle', () => {
		it('should find an alert by its title', async () => {
			const alert = await alerts.findByTitle(newAlert.title);
			expect(alert).toBeDefined();
			expect(alert?.title).toBe(newAlert.title);
		});

		it('should return null if the alert is not found', async () => {
			const alert = await alerts.findByTitle('NON_EXISTENT_TITLE');
			expect(alert).toBeNull();
		});
	});

	describe('updateById', () => {
		it('should update an alert\'s description', async () => {
			const updatedFields = { description: 'Updated Alert Description' };
			const updateResult = await alerts.updateById(insertedAlertId, updatedFields);
			expect(updateResult.modifiedCount).toBe(1);

			const updatedAlert = await alerts.findByTitle(newAlert.title);
			expect(updatedAlert?.description).toBe(updatedFields.description);
		});

		it('should return modifiedCount as 0 if the alert does not exist', async () => {
			const updateResult = await alerts.updateById('NON_EXISTENT_ID', { description: 'Should Not Update' });
			expect(updateResult.modifiedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		it('should update all alerts', async () => {
			const updateResult = await alerts.updateMany({ type: 'PLANNED' }, { type: 'REALTIME' });
			expect(updateResult.modifiedCount).toEqual((await alerts.all()).length);
		});

		it('should return modifiedCount as 0 if no alerts match the filter', async () => {
			const updateResult = await alerts.updateMany({ title: 'NON_EXISTENT_TITLE' }, { type: 'REALTIME' });
			expect(updateResult.modifiedCount).toBe(0);
		});

		it('should reject with HttpException if update fields are invalid', async () => {
			await expect(alerts.updateMany({ type: 'PLANNED' }, { type: 1 as unknown as 'PLANNED' | 'REALTIME' }))
				.rejects.toThrow(HttpException);
		});
	});

	describe('deleteOne', () => {
		it('should delete an alert', async () => {
			const result = await alerts.deleteOne({ _id: insertedAlertId });
			expect(result.deletedCount).toBe(1);

			const deletedAlert = await alerts.findById(insertedAlertId);
			expect(deletedAlert).toBeNull();
		});

		it('should return deletedCount as 0 if the alert does not exist', async () => {
			const result = await alerts.deleteOne({ _id: 'NON_EXISTENT_ID' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		const alertsToDelete: CreateAlertDto[] = [
			{ ...newAlert, title: 'Test Alert 2' },
			{ ...newAlert, title: 'Test Alert 3' },
		];

		beforeAll(async () => {
			for (const alert of alertsToDelete) {
				await alerts.insertOne(alert);
			}
		});

		it('should delete multiple alerts', async () => {
			const result = await alerts.deleteMany({ title: { $in: alertsToDelete.map(alert => alert.title) } });
			expect(result.deletedCount).toBe(alertsToDelete.length);
		});

		it('should return deletedCount as 0 if no alerts match the filter', async () => {
			const result = await alerts.deleteMany({ title: 'NON_EXISTENT_TITLE' });
			expect(result.deletedCount).toBe(0);
		});
	});
});
