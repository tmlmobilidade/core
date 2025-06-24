/* eslint-disable @typescript-eslint/no-extraneous-class */

/* * */

import { S3StorageProvider, S3StorageProviderConfiguration } from '@/providers/storage/s3-storage.js';
import { IStorageProvider } from '@/providers/storage/storage.interface.js';

/* * */

export type StorageConfiguration = {
	aws_config: S3StorageProviderConfiguration
	type: 'aws'
} | {
	cloudflare_config: S3StorageProviderConfiguration & {
		endpoint: string
	}
	type: 'cloudflare'
} | {
	oci_config: S3StorageProviderConfiguration
	type: 'oci'
};

/* * */

export class StorageFactory {
	/**
     * Creates and returns an instance of a storage service based on the provided configuration.
     *
     * @param config - The storage configuration object.
     * @returns An instance of a class that implements IStorageProvider.
     */
	public static create(config: StorageConfiguration): IStorageProvider {
		switch (config.type) {
			case 'aws':
				return new S3StorageProvider(config.aws_config);
			case 'cloudflare':
				return new S3StorageProvider(config.cloudflare_config);
			case 'oci':
				return new S3StorageProvider(config.oci_config);
			default:
				throw new Error(`Invalid storage type`);
		}
	}
}
