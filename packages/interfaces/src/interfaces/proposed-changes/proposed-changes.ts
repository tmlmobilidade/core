// /* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { CreateProposedChangeDto, ProposedChange, ProposedChangeSchema, Stop, UpdateProposedChangeDto, UpdateProposedChangeSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy } from '@tmlmobilidade/utils';
import { Filter, IndexDescription, Sort } from 'mongodb';
import { z } from 'zod';

/* * */

class ProposedChangesClass extends MongoCollectionClass<ProposedChange, CreateProposedChangeDto, UpdateProposedChangeDto> {
	private static _instance: ProposedChangesClass;
	protected override createSchema: z.ZodSchema = ProposedChangeSchema;
	protected override updateSchema: z.ZodSchema = UpdateProposedChangeSchema;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!ProposedChangesClass._instance) {
			const instance = new ProposedChangesClass();
			await instance.connect();
			ProposedChangesClass._instance = instance;
		}
		return ProposedChangesClass._instance;
	}

	/**
	 * Finds stop documents by municipality ID with optional pagination and sorting.
	 *
	 * @param id - The municipality ID to search for
	 * @param perPage - Optional number of documents per page for pagination
	 * @param page - Optional page number for pagination
	 * @param sort - Optional sort specification
	 * @returns A promise that resolves to an array of matching proposed changes documents
	 */
	async findByMunicipalityId(id: string, perPage?: number, page?: number, sort?: Sort) {
		const query = this.mongoCollection.find({ municipality_id: id } as Filter<ProposedChange>);
		if (perPage) query.limit(perPage);
		if (page && perPage) query.skip(perPage * (page - 1));
		if (sort) query.sort(sort);
		return query.toArray();
	}

	/**
	 * Finds multiple Proposed Changes documents by their IDs.
	 *
	 * @param ids - Array of Proposed Changes IDs to search for
	 * @returns A promise that resolves to an array of matching Proposed Changes documents
	 */
	async findManyByIds(ids: string[]) {
		return this.mongoCollection.find({ _id: { $in: ids } } as Filter<ProposedChange>).toArray();
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { name: 1 } },
		];
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
