/* * */

/**
 * Checks if the given latitude value is valid.
 * @param value The latitude value to check.
 * @returns True if the latitude is valid, false otherwise.
 */
export function isValidLatitude(value: number): boolean {
	return value >= -90 && value <= 90;
}

/**
 * Checks if the given longitude value is valid.
 * @param value The longitude value to check.
 * @returns True if the longitude is valid, false otherwise.
 */
export function isValidLongitude(value: number): boolean {
	return value >= -180 && value <= 180;
}

/**
 * Checks if the given latitude and longitude values form a valid coordinate pair.
 * @param lat The latitude value to check.
 * @param lng The longitude value to check.
 * @returns True if the coordinate pair is valid, false otherwise.
 */
export function isValidCoordinatePair(lat: number, lng: number): boolean {
	return isValidLatitude(lat) && isValidLongitude(lng);
}

/**
 * Clamps a coordinate value to 6 decimal places.
 * @param value The coordinate value to clamp.
 * @returns The clamped coordinate value.
 */
export function clampCoordinate(value: number): number {
	return parseFloat(value.toFixed(6));
}

/**
 * Parses a coordinate pair string in the following formats:
 * - `lat, lng`
 * - `lat lng` (with a space or a tab)
 * @param input The coordinate pair string to parse.
 * @param clamp Whether to clamp the latitude and longitude values to 6 decimal places.
 * @returns The parsed coordinates as an object, or null if the input is invalid.
 */
export const parseCoordinatePairString = (input: string, clamp = true): null | { lat: number, lng: number } => {
	const regex = /^\s*([+-]?\d+(?:\.\d+)?)\s*(?:,|\s)\s*([+-]?\d+(?:\.\d+)?)\s*$/;
	const match = input.match(regex);
	if (!match) return null;
	const lat = parseFloat(match[1]);
	const lng = parseFloat(match[2]);
	if (clamp) return isValidCoordinatePair(lat, lng) ? { lat: clampCoordinate(lat), lng: clampCoordinate(lng) } : null;
	else return isValidCoordinatePair(lat, lng) ? { lat, lng } : null;
};
