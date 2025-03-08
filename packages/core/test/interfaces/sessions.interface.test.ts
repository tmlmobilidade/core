import { sessions } from '@/interfaces';
import { HttpException, HttpStatus } from '@/lib';
import { CreateSessionDto } from '@/types';
import { generateRandomString } from '@/utils';

let insertedSessionId: string;
const userId = generateRandomString({ length: 10 });

const newSession: CreateSessionDto = {
	token: 'test_token',
	user_id: userId,
};

describe('SessionsClass', () => {
	afterAll(async () => {
		await sessions.disconnect();
	});

	describe('insertOne', () => {
		it('should insert a new session', async () => {
			const result = await sessions.insertOne(newSession);
			expect(result.insertedId).toBeDefined();

			insertedSessionId = result.insertedId.toString();

			const insertedSession = await sessions.findById(insertedSessionId);
			expect(insertedSession).toBeDefined();
			expect(insertedSession?.token).toBe(newSession.token);
		});

		it('should throw an error if the session already exists', async () => {
			await expect(sessions.insertOne(newSession)).rejects.toThrow();
		});
	});

	describe('findById', () => {
		it('should find a session by its ID', async () => {
			const session = await sessions.findById(insertedSessionId);
			expect(session?.user_id).toBe(userId);
		});

		it('should return null if the session is not found', async () => {
			const session = await sessions.findById('NON_EXISTENT_ID');
			expect(session).toBeNull();
		});
	});

	describe('deleteOne', () => {
		it('should delete a session', async () => {
			const result = await sessions.deleteOne({ _id: insertedSessionId });
			expect(result.deletedCount).toBe(1);

			const deletedSession = await sessions.findById(insertedSessionId);
			expect(deletedSession).toBeNull();
		});

		it('should return deletedCount as 0 if the session does not exist', async () => {
			const result = await sessions.deleteOne({ _id: 'NON_EXISTENT_ID' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('deleteMany', () => {
		const sessionsToDelete: CreateSessionDto[] = [
			{ token: 'token_1', user_id: userId },
			{ token: 'token_2', user_id: userId },
		];

		beforeAll(async () => {
			for (const session of sessionsToDelete) {
				await sessions.insertOne(session);
			}
		});

		it('should delete multiple sessions', async () => {
			const result = await sessions.deleteMany({});
			expect(result.deletedCount).toBe(sessionsToDelete.length);
		});

		it('should return deletedCount as 0 if no sessions match the filter', async () => {
			const result = await sessions.deleteMany({ token: 'NON_EXISTENT_TOKEN' });
			expect(result.deletedCount).toBe(0);
		});
	});

	describe('updateMany', () => {
		it('should throw HttpException', async () => {
			await expect(sessions.updateMany()).rejects.toThrow(new HttpException(HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed for sessions'));
		});
	});
});
