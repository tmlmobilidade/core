/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateNotificationDto, Notification, NotificationSchema, Permission, UpdateNotificationDto, UpdateNotificationSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

import { users } from '../auth/users.js';

/* * */

class NotificationsClass extends MongoCollectionClass<Notification, CreateNotificationDto, UpdateNotificationDto> {
	private static _instance: NotificationsClass;
	protected override createSchema: z.ZodSchema = NotificationSchema;
	protected override updateSchema: z.ZodSchema = UpdateNotificationSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!NotificationsClass._instance) {
			const instance = new NotificationsClass();
			await instance.connect();
			NotificationsClass._instance = instance;
		}
		return NotificationsClass._instance;
	}

	public async sendNotification({ payload, scope, topic }: { payload: Notification['payload'], scope: string, topic: string }): Promise<void> {
		const usersWithTopic = await users.findMany({ subscribed_topics: { $in: [topic] } });
		console.log('👥 Users found with topic:', topic, usersWithTopic);

		// for (const user of usersWithTopic) {
		// 	return;
		// }
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'notifications';
	}

	protected getCreateSchema(): z.ZodSchema {
		return NotificationSchema;
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

export const notifications = AsyncSingletonProxy(NotificationsClass);
