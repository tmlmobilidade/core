/* * */

/**
 * Checks if the given latitude value is valid.
 * @param value The latitude value to check.
 * @returns True if the latitude is valid, false otherwise.
 */
export function isValidLatitude(value: number) {
	return value >= -90 && value <= 90;
}

/**
 * Checks if the given longitude value is valid.
 * @param value The longitude value to check.
 * @returns True if the longitude is valid, false otherwise.
 */
export function isValidLongitude(value: number) {
	return value >= -180 && value <= 180;
}

/**
 * Checks if the given latitude and longitude values form a valid coordinate pair.
 * @param lat The latitude value to check.
 * @param lng The longitude value to check.
 * @returns True if the coordinate pair is valid, false otherwise.
 */
export function isValidCoordinatePair(lat: number, lng: number) {
	return isValidLatitude(lat) && isValidLongitude(lng);
}

/**
 * Parses a coordinate string in the following formats:
 * - `lat, lng`
 * - `lat lng` (with a space or a tab)
 * @param input The coordinate string to parse.
 * @returns The parsed coordinates as an object, or null if the input is invalid.
 */
export const parseCoordinateString = (input: string): null | { lat: number, lng: number } => {
	const regex = /^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/;
	const match = input.match(regex);
	if (!match) return null;
	const lat = parseFloat(match[1]);
	const lng = parseFloat(match[2]);
	return isValidCoordinatePair(lat, lng) ? { lat, lng } : null;
};
