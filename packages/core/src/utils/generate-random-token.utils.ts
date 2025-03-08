import { v4 as uuid } from 'uuid';

export function generateRandomToken() {
	return Buffer.from(uuid()).toString('base64');
}
