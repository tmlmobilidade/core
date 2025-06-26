/* * */

const BALLPARK_THRESHOLD = 800; // meters

/**
 * This function checks if a value is small enough to be considered a meter value,
 * as it should be used exclusevely for trip distance values.
 * If the value is greater than 1, it is considered to be in meters.
 * Converts a value to meters if it is in kilometers, otherwise returns meters.
 * @param value - The value to be checked
 * @param context - The context in which the value is being used
 * @param ballpark - A ballpark value to be used as a reference. It is recommended to use the total distance of the object.
 * @returns The value in meters
 */
export function convertMetersOrKilometersToMeters(value: number | string, ballpark: number | string): number {
	//

	const valueAsNumber = Number(value);
	const ballparkAsNumber = Number(ballpark);

	if (Number.isNaN(valueAsNumber)) throw new Error('Value must be a number or a string that can be converted to a number.');
	if (Number.isNaN(ballparkAsNumber)) throw new Error('Ballpark must be a number or a string that can be converted to a number.');

	// If the ballpark is bigger than 800, then the value is in meters
	// Otherwise, the value is in kilometers. This is because it is unlikely
	// that a trip will be smaller than 800 meters, and longer than 800 kilometers.

	if (ballparkAsNumber > BALLPARK_THRESHOLD) {
		return valueAsNumber;
	}

	return valueAsNumber * 1000;

	//
};
