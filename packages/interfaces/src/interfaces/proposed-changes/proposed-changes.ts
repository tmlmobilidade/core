// /* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateProposedChangeDto, ProposedChange, ProposedChangeSchema, UpdateProposedChangeDto, UpdateProposedChangeSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { IndexDescription } from 'mongodb';
import { z } from 'zod';

/* * */

class ProposedChangesClass<T> extends MongoCollectionClass<ProposedChange<T>, CreateProposedChangeDto, UpdateProposedChangeDto> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static _instances = new Map<string, ProposedChangesClass<any>>();
	protected override createSchema: z.ZodSchema = ProposedChangeSchema;
	protected override updateSchema: z.ZodSchema = UpdateProposedChangeSchema;

	private constructor() {
		super();
	}

	public static async getInstance<T>(typeName?: string): Promise<ProposedChangesClass<T>> {
		const key = typeName ?? 'default';

		if (!this._instances.has(key)) {
			const instance = new ProposedChangesClass<T>();
			await instance.connect();
			this._instances.set(key, instance);
		}

		return this._instances.get(key) as ProposedChangesClass<T>;
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [{ background: true, key: { name: 1 } }];
	}

	protected getCollectionName(): string {
		return 'proposed_changes';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_PROPOSED_CHANGES';
	}
}
/* * */

export const proposedChanges = AsyncSingletonProxy(ProposedChangesClass);
