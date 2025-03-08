import { MongoCollectionClass } from '@/classes/mongo-collection.class';
import { HttpException, HttpStatus } from '@/lib';
import { CreateVerificationTokenDto, UpdateVerificationTokenDto, VerificationToken } from '@/types';
import { AsyncSingletonProxy } from '@/utils';
import { IndexDescription, UpdateResult } from 'mongodb';

class VerificationTokensClass extends MongoCollectionClass<VerificationToken, CreateVerificationTokenDto, UpdateVerificationTokenDto> {
	private static _instance: VerificationTokensClass;

	private constructor() {
		super();
	}

	public static async getInstance() {
		if (!VerificationTokensClass._instance) {
			const instance = new VerificationTokensClass();
			await instance.connect();
			VerificationTokensClass._instance = instance;
		}
		return VerificationTokensClass._instance;
	}

	/**
	 * Finds a verification token by its token.
	 *
	 * @param token - The token to find
	 * @returns The verification token or null if not found
	 */
	async findByToken(token: string) {
		return this.findOne({ token });
	}

	/**
	 * Disable Update Many
	 */
	async updateMany(): Promise<UpdateResult<VerificationToken>> {
		throw new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for verification tokens');
	}

	protected getCollectionIndexes(): IndexDescription[] {
		return [
			{ background: true, key: { expires: 1 } },
			{ background: true, key: { token: 1 }, unique: true },
		];
	}

	protected getCollectionName(): string {
		return 'verification_tokens';
	}

	protected getEnvName(): string {
		return 'TML_INTERFACE_AUTH';
	}
}

export const verificationTokens = AsyncSingletonProxy(VerificationTokensClass);
