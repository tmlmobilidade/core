/* * */

import { FeatureCollection, Point } from 'geojson';

/**
 * Creates a base GeoJSON feature collection for point features.
 * @returns A base GeoJSON feature collection with an empty features array.
 */
export const getBaseGeoJsonFeatureCollectionPoint = <T>(): FeatureCollection<Point, T> => {
	return Object.assign({ features: [], type: 'FeatureCollection' });
};
