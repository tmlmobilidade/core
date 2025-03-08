/**
 * Creates a random string of a given length and type.
 *
 * @param length - The length of the string to generate.
 * @param type - The type of characters to include in the string.
 * @returns A random string of the specified length.
 */
interface GenerateRandomStringOptions {
	length?: number
	type?: 'alphanumeric' | 'numeric'
}

export function generateRandomString({ length = 6, type = 'alphanumeric' }: GenerateRandomStringOptions = {}): string {
	//

	const numericSet = '0123456789';
	const alphanumericSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

	let allowedCharacters: string;

	switch (type) {
		case 'numeric':
			allowedCharacters = numericSet;
			break;
		default:
			allowedCharacters = alphanumericSet;
			break;
	}

	let result = '';

	for (let i = 0; i < length; i++) {
		result += allowedCharacters.charAt(Math.floor(Math.random() * allowedCharacters.length));
	}

	return result;

	//
}
