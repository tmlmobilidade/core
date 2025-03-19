/* * */

import { MongoCollectionClass } from '@/classes/mongo-collection.class.js';
import { VehicleEvent } from '@/types/index.js';
import { AsyncSingletonProxy } from '@/utils/index.js';
import { IndexDescription } from 'mongodb';

/* * */

class VehicleEventsClass extends MongoCollectionClass<VehicleEvent, VehicleEvent, VehicleEvent> {
	private static _instance: VehicleEventsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!VehicleEventsClass._instance) {
			const instance = new VehicleEventsClass();
			await instance.connect();
			VehicleEventsClass._instance = instance;
		}
		return VehicleEventsClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { created_at: 1 } },
			{ background: true, key: { received_at: 1 } },
			// eslint-disable-next-line perfectionist/sort-objects
			{ background: true, key: { trip_id: 1, created_at: 1 } },
			{ background: true, key: { agency_id: 1, created_at: 1 } },
			// eslint-disable-next-line perfectionist/sort-objects
			{ background: true, key: { vehicle_id: 1, created_at: 1 } },
		];
	}

	protected getCollectionName(): string {
		return 'vehicle_events';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_VEHICLE_EVENTS';
	}
}

/* * */

export const vehicleEvents = AsyncSingletonProxy(VehicleEventsClass);
