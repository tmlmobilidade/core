/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { sendNotificationEmail } from '@tmlmobilidade/emails';
import { getAppConfig } from '@tmlmobilidade/lib';
import { CreateNotificationDto, Notification, NotificationPermission, NotificationSchema, UpdateNotificationDto, UpdateNotificationSchema, User } from '@tmlmobilidade/types';
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

	public async sendNotification(scope: string, topic: string, user: User, id: string, title: string, description: string): Promise<void> {
		const usersWithTopic: User[] = await users.findMany({ 'permissions.action': topic });

		if (usersWithTopic.length === 0) return;

		const notification: CreateNotificationDto = {
			created_by: user?._id,
			is_read: false,
			payload: {
				body: description,
				href: `${getAppConfig(`${topic}`, 'frontend_url')}/${topic}/${id}`,
				icon: topic,
				title: title,
			},
			priority: 'normal',
			scope: scope,
			topic: topic,
			updated_by: user?._id,
		};

		for (const user of usersWithTopic.filter(u => u._id !== notification.created_by)) {
			const sendMail = user?.permissions.find(p => p.scope === 'notifications' && p.action === 'created_alert')?.resource as NotificationPermission ?? false;
			const newNotification: CreateNotificationDto = { ...notification, user_id: user._id };
			if (sendMail) {
				await sendNotificationEmail({
					props: {
						body: notification.payload.body,
						href: notification.payload.href || '',
						priority: notification.priority,
						scope: notification.scope,
						title: notification.payload.title,
						topic: notification.topic,
					}, to: user.email,
				});
			}

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
