/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateTopicDto, Topic, TopicSchema, UpdateTopicDto, UpdateTopicSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class TopicsClass extends MongoCollectionClass<Topic, CreateTopicDto, UpdateTopicDto> {
	private static _instance: TopicsClass;
	protected override createSchema: z.ZodSchema = TopicSchema;
	protected override updateSchema: z.ZodSchema = UpdateTopicSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!TopicsClass._instance) {
			const instance = new TopicsClass();
			await instance.connect();
			TopicsClass._instance = instance;
		}
		return TopicsClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'topics';
	}

	protected getCreateSchema(): z.ZodSchema {
		return TopicsClass;
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

export const topics = AsyncSingletonProxy(TopicsClass);
