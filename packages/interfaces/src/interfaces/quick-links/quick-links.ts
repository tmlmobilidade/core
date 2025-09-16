/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateQuickLinkDto, CreateQuickLinkSchema, QuickLink, QuickLinkSchema, UpdateQuickLinkDto, UpdateQuickLinkSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class QuickLinksClass extends MongoCollectionClass<QuickLink, CreateQuickLinkDto, UpdateQuickLinkDto> {
	private static _instance: QuickLinksClass;
	protected override createSchema: z.ZodSchema = CreateQuickLinkSchema;
	protected override updateSchema: z.ZodSchema = UpdateQuickLinkSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!QuickLinksClass._instance) {
			const instance = new QuickLinksClass();
			await instance.connect();
			QuickLinksClass._instance = instance;
		}
		return QuickLinksClass._instance;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { _id: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'quick_links';
	}

	protected getCreateSchema(): z.ZodSchema {
		return QuickLinkSchema;
	}

	protected getEnvName(): string {
		return 'DATABASE_URI';
	}
}

export const quick_links = AsyncSingletonProxy(QuickLinksClass);
