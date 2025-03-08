import { convertObject } from '@/utils/convert-object.utils';

import {
	expectedObject,
	expectedObjectSchema,
	expectedObjectWithOptionalFieldMissing,
	sourceObjectWithAllFields,
	sourceObjectWithExtraFields,
	sourceObjectWithInvalidFieldTypes,
	sourceObjectWithOptionalFieldMissing,
	sourceObjectWithRequiredFieldMissing,
} from '../data/convert-object';

describe('convertObject', () => {
	it('should convert an object to the expected format if all fields are present', () => {
		const result = convertObject(sourceObjectWithAllFields, expectedObjectSchema);
		expect(result).toEqual(expectedObject);
	});

	it('should convert an object with missing optional fields to the expected format', () => {
		const result = convertObject(sourceObjectWithOptionalFieldMissing, expectedObjectSchema);
		expect(result).toEqual(expectedObjectWithOptionalFieldMissing);
	});

	it('should convert an object with extra fields to the expected format', () => {
		const result = convertObject(sourceObjectWithExtraFields, expectedObjectSchema);
		expect(result).toEqual(expectedObject);
	});

	it('should throw an error if the object has invalid field types', () => {
		expect(() => convertObject(sourceObjectWithInvalidFieldTypes, expectedObjectSchema)).toThrow();
	});

	it('should throw an error if the object has missing required fields', () => {
		expect(() => convertObject(sourceObjectWithRequiredFieldMissing, expectedObjectSchema)).toThrow();
	});
});
