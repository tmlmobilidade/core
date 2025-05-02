import { BackupConfig } from '@/backup/backup.service.js';
import { MongoDbConfig } from '@/database/mongo.service.js';
import { PostgresConfig } from '@/database/postgres.service.js';
import { EmailConfig } from '@/mailer/mailer.service.js';
import { S3StorageProviderConfiguration } from '@tmlmobilidade/interfaces';

export interface StorageConfig {
	aws_config?: S3StorageProviderConfiguration
	r2_config?: {
		endpoint: string
	} & S3StorageProviderConfiguration
	type: 'aws' | 'cloudflare'
}

export interface MongoDBOptions {
	connectTimeoutMS: number
	directConnection: boolean
	maxPoolSize: number
	minPoolSize: number
	readPreference: string
	serverSelectionTimeoutMS: number
}

export interface DatabaseConfig {
	mongodb_config?: MongoDbConfig
	postgres_config?: PostgresConfig
	type: 'mongodb' | 'postgres'
}

export interface AppConfig {
	backup: BackupConfig
	database: DatabaseConfig
	email?: EmailConfig
	storage: StorageConfig
}
