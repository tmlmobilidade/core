/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateNotificationDto, Notification, NotificationSchema, UpdateNotificationDto, UpdateNotificationSchema } from '@tmlmobilidade/types';
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

	public async sendNotification(notification: CreateNotificationDto): Promise<void> {
		const usersWithTopic = await users.findMany({ 'permissions.action': notification.topic });

		if (usersWithTopic.length === 0) return;

		for (const user of usersWithTopic.filter(u => u._id !== notification.created_by)) {
			const newNotification: CreateNotificationDto = { ...notification, user_id: user._id };
			await notifications.insertOne(newNotification);
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
