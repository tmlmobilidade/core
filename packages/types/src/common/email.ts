/* * */

export type Email = string & {
	__brand: 'Email'
};

export function createEmail(email: string): Email {
	const parsedEmail = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
	if (!parsedEmail) throw new Error(`Invalid email format '${email}'`);
	return email as Email;
}
