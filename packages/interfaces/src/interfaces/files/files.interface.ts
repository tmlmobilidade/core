/* * */

import { MongoCollectionClass } from '@/mongo-collection.js';
import { IStorageProvider, StorageFactory } from '@/providers/index.js';
import { HttpStatus } from '@tmlmobilidade/lib';
import { HttpException } from '@tmlmobilidade/lib';
import { CreateFileDto, File, FileSchema, UpdateFileDto, UpdateFileSchema } from '@tmlmobilidade/types';
import { AsyncSingletonProxy, getFileExtension } from '@tmlmobilidade/utils';
import { generateRandomString } from '@tmlmobilidade/utils';
import { DeleteResult, IndexDescription, InsertOneResult } from 'mongodb';
import { z } from 'zod';

/* * */

class FilesClass extends MongoCollectionClass<File, CreateFileDto, UpdateFileDto> {
	private static _instance: FilesClass;
	protected override createSchema: z.ZodSchema = FileSchema;
	protected override updateSchema: z.ZodSchema = UpdateFileSchema;
	private readonly bucketName: string;
	private readonly storageService: IStorageProvider;

	private constructor() {
		super();

		switch (process.env.TML_INTERFACE_FILES_STORAGE_TYPE) {
			case 'aws':
				if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_BUCKET_NAME || !process.env.AWS_SECRET_ACCESS_KEY) {
					throw new Error('AWS_ACCESS_KEY_ID, AWS_BUCKET_NAME, and AWS_SECRET_ACCESS_KEY must be set');
				}
				this.bucketName = process.env.AWS_BUCKET_NAME;
				this.storageService = StorageFactory.create({
					aws_config: {
						access_key_id: process.env.AWS_ACCESS_KEY_ID,
						bucket_name: process.env.AWS_BUCKET_NAME,
						secret_access_key: process.env.AWS_SECRET_ACCESS_KEY,
					},
					type: 'aws',
				});
				break;
			case 'cloudflare':
				if (!process.env.CLOUDFLARE_ACCESS_KEY_ID || !process.env.CLOUDFLARE_BUCKET_NAME || !process.env.CLOUDFLARE_SECRET_ACCESS_KEY) {
					throw new Error('CLOUDFLARE_ACCESS_KEY_ID, CLOUDFLARE_BUCKET_NAME, and CLOUDFLARE_SECRET_ACCESS_KEY must be set');
				}
				this.bucketName = process.env.CLOUDFLARE_BUCKET_NAME;
				this.storageService = StorageFactory.create({
					cloudflare_config: {
						access_key_id: process.env.CLOUDFLARE_ACCESS_KEY_ID,
						bucket_name: process.env.CLOUDFLARE_BUCKET_NAME,
						endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
						region: 'auto',
						secret_access_key: process.env.CLOUDFLARE_SECRET_ACCESS_KEY,
					},
					type: 'cloudflare',
				});
				break;
			default:
				throw new Error(`Invalid storage type: ${process.env.TML_INTERFACE_FILES_STORAGE_TYPE}`);
		}
	}

	public static async getInstance() {
		if (!FilesClass._instance) {
			const instance = new FilesClass();
			await instance.connect();
			FilesClass._instance = instance;
		}
		return FilesClass._instance;
	}

	/**
	 * Deletes a file from the storage service and the database.
	 * @param file_id - The unique identifier of the file in the database.
	 * @returns The file that was deleted.
	 */
	public override async deleteById(file_id: string): Promise<DeleteResult> {
		const file = await this.findOne({ _id: file_id });

		if (!file) {
			throw new HttpException(HttpStatus.NOT_FOUND, 'File not found');
		}

		await this.storageService.deleteFile(`${file.scope}/${file.resource_id}/${file._id}`);
		return await super.deleteById(file_id);
	}

	/**
	 * Retrieves the signed URL of a file from the storage service.
	 * @param params - Object containing either `file_id` or `key`.
	 * @param params.file_id - The unique identifier of the file in the database.
	 * @param params.key - The storage key of the file.
	 * @returns The signed URL of the file.
	 * @throws {Error} If neither `file_id` nor `key` is provided.
	 * @throws {HttpException} If `file_id` is provided but the file is not found.
	*/
	public async getFileUrl({
		file_id,
		key,
	}: {
		file_id?: string
		key?: string
	}): Promise<string> {
		if (!file_id && !key) {
			throw new Error('Either "file_id" or "key" must be provided');
		}

		// If `file_id` is provided, fetch the file and use its key
		if (file_id) {
			const file = await this.findOne({ _id: file_id });
			if (!file) {
				throw new HttpException(HttpStatus.NOT_FOUND, 'File not found');
			}
			key = `${file.scope}/${file.resource_id}/${file._id}`; // Use the file's storage key
		}

		// Check if key exists
		const keyExists = await this.storageService.fileExists(key as string);
		if (!keyExists) {
			throw new HttpException(HttpStatus.NOT_FOUND, `Key ${key} does not exist in bucket ${this.bucketName}`);
		}

		// At this point, `key` must exist
		return this.storageService.getFileUrl(key as string);
	}

	/**
	 * Uploads a file to the storage service and inserts it into the database.
	 * @param file - The file to upload.
	 * @param createFileDto - The file type to create.
	 * @returns The file that was uploaded.
	 */
	public async upload(file: Buffer, createFileDto: CreateFileDto): Promise<InsertOneResult<File>> {
		const _id = generateRandomString({ length: 5 });
		await this.storageService.uploadFile(`${createFileDto.scope}/${createFileDto.resource_id}/${_id}`, getFileExtension(createFileDto.name), file);
		return await this.insertOne({ ...createFileDto, _id });
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { created_by: 1 } },
			{ background: true, key: { updated_by: 1 } },
			{ background: true, key: { name: 1 } },
			{ background: true, key: { type: 1 } },
			{ background: true, key: { created_at: -1 } },
			{ background: true, key: { updated_at: -1 } },
		];
	}

	protected getCollectionName(): string {
		return 'files';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_FILES';
	}
}

/* * */

export const files = AsyncSingletonProxy(FilesClass);
