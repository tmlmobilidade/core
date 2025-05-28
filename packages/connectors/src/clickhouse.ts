/* * */

import { type ClickHouseClient, type ClickHouseClientConfigOptions, createClient } from '@clickhouse/client';

/* * */

export class ClickHouseConnector {
	private client: ClickHouseClient;

	constructor(config: ClickHouseClientConfigOptions) {
		this.client = createClient(config);
	}

	/**
     * Disconnects from the ClickHouse database.
     */
	async disconnect(): Promise<void> {
		await this.client.close();
		console.log('Disconnected from ClickHouse.');
	}
}
