/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoConnector } from '@tmlmobilidade/connectors';
import { ClientSession } from 'mongodb';

import { MongoCollectionClass } from './mongo-collection.js';

export class Transaction {
	private session: ClientSession;

	constructor(private mongoConnector: MongoConnector) {}

	async abort() {
		await this.session.abortTransaction();
		await this.session.endSession();
	}

	async commit() {
		await this.session.commitTransaction();
		await this.session.endSession();
	}

	async start() {
		this.session = await this.mongoConnector.client.startSession();
		this.session.startTransaction();
	}
}

export class TransactionManager {
	constructor(private collections: MongoCollectionClass<any, any, any>[]) {}

	async withTransaction<T>(
		callback: (collections: MongoCollectionClass<any, any, any>[], transaction: Transaction) => Promise<T>,
	): Promise<T> {
		const transaction = new Transaction(this.collections[0].getMongoConnector());

		try {
			await transaction.start();
			const result = await callback(this.collections, transaction);
			await transaction.commit();
			return result;
		}
		catch (error) {
			await transaction.abort();
			throw error;
		}
	}
}
