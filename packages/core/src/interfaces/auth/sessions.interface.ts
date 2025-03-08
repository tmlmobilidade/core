import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { HttpException, HttpStatus } from '@/lib';
import { AsyncSingletonProxy } from '@/utils';
import { CreateSessionDto, Session, UpdateSessionDto } from '@/types';
import { IndexDescription, UpdateResult } from 'mongodb';

class SessionsClass extends MongoCollectionClass<Session, CreateSessionDto, UpdateSessionDto> {
	private static _instance: SessionsClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!SessionsClass._instance) {
			const instance = new SessionsClass();
			await instance.connect();
			SessionsClass._instance = instance;
		}
		return SessionsClass._instance;
	}

	/**
	 * Disable Update Many
	 */
	async updateMany(): Promise<UpdateResult<Session>> {
		throw new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for sessions');
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { user_id: 1 } },
			{ background: true, key: { expires: 1 } },
			{ background: true, key: { token: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'sessions';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_AUTH';
	}
}

export const sessions = AsyncSingletonProxy(SessionsClass);
