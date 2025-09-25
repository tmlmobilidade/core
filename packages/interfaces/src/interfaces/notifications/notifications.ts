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

		if (usersWithTopic.length === 0) return;

		for (const user of usersWithTopic) {
			console.log('user updated', payload, scope);
			users.updateById(user._id, { active_notifications: [...user.active_notifications, JSON.stringify(payload)] });
		}
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
