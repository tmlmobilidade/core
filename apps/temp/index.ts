import { PasswordRequirementsSchema } from '@tmlmobilidade/core/types';

const validPassword = 'Password123!';
const invalidPassword = 'P123wefefef';

const validResult = PasswordRequirementsSchema.safeParse({
	password: validPassword,
});
const invalidResult = PasswordRequirementsSchema.safeParse({
	password: invalidPassword,
});

console.log(validResult);
console.log(invalidResult.error.issues);
const errors = invalidResult.error.issues.map((issue) => JSON.parse(issue.message));
console.log(errors);
