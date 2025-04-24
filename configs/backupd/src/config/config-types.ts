import { BackupConfig } from '@/backup/backup.service';
import { MongoDbConfig } from '@/database/mongo.service';
import { PostgresConfig } from '@/database/postgres.service';
import { EmailConfig } from '@/mailer/mailer.service';
import { S3StorageProviderConfiguration } from '@tmlmobilidade/core/providers';

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
