import { S3StorageProvider, S3StorageProviderConfiguration } from './s3-storage.provider';
import { IStorageProvider } from './storage.interface';

export type StorageConfiguration = {
	aws_config: S3StorageProviderConfiguration
	type: 'aws'
} | {
	cloudflare_config: S3StorageProviderConfiguration & {
		endpoint: string
	}
	type: 'cloudflare'
};

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
			default:
				throw new Error(`Invalid storage type`);
		}
	}
}
