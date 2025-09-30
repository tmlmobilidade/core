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

	public async sendNotification({ payload, scope, topic }: { payload: Notification['payload'], scope: string, topic: string }): Promise<void> {
		const usersWithTopic = await users.findMany({ subscribed_topics: { $in: [topic] } });
		console.log('creating', scope, topic, usersWithTopic);

		if (usersWithTopic.length === 0) return;

		for (const user of usersWithTopic) {
			const notification: Notification = {
				_id: crypto.randomUUID(),
				created_at: Date.now() as Notification['created_at'],
				is_read: false,
				needs_email: false,
				payload: {
					body: payload.body || 'Sem corpo',
					href: payload.href || 'http://www.carrismetropolitana.pt',
					icon: payload.icon || 'http://www.carrismetropolitana.pt',
					title: payload.title || 'Sem titulo',
				},
				priority: 'normal',
				scope: scope,
				topic: topic,
				updated_at: Date.now() as Notification['updated_at'],
				user_id: user._id,
			};
			try {
				await users.updateById(user._id, {
					active_notifications: [...(user.active_notifications || []), notification._id],
				});
			}
			catch (err) {
				console.error('Failed to update user notifications:', err);
			}
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
