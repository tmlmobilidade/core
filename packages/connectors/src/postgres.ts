import { Client, ClientConfig } from 'pg';

export interface PostgresConfig {
	options?: ClientConfig
	uri: string
}

export class PostgresConnector {
	private client: Client;

	constructor(config: PostgresConfig) {
		this.client = new Client({ connectionString: config.uri, ...config.options });
	}

	/**
     * Connects to the PostgreSQL database.
     */
	async connect(): Promise<void> {
		await this.client.connect();
		console.log('Connected to PostgreSQL.');
	}

	/**
     * Disconnects from the PostgreSQL database.
     */
	async disconnect(): Promise<void> {
		await this.client.end();
		console.log('Disconnected from PostgreSQL.');
	}
}
