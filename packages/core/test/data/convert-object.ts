import z from 'zod';

export const expectedObjectSchema = z.object({
	a: z.number(),
	b: z.string(),
	c: z.string().nullish(),
});

export const expectedObject = {
	a: 1,
	b: '2',
	c: '3',
};

export const expectedObjectWithOptionalFieldMissing = {
	a: 1,
	b: '2',
};

export const sourceObjectWithAllFields = {
	a: 1,
	b: '2',
	c: '3',
};

export const sourceObjectWithOptionalFieldMissing = {
	a: 1,
	b: '2',
};

export const sourceObjectWithRequiredFieldMissing = {
	a: 1,
	c: '3',
};

export const sourceObjectWithExtraFields = {
	a: 1,
	b: '2',
	c: '3',
	d: '4',
};

export const sourceObjectWithInvalidFieldTypes = {
	a: '1',
	b: 2,
	c: 3,
};
