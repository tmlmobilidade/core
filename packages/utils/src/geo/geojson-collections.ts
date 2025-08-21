/* * */

import { type FeatureCollection, type Geometry } from 'geojson';

/**
 * Creates a base GeoJSON feature collection for the given feature type.
 * @returns A base GeoJSON feature collection with an empty features array.
 */
export const getBaseGeoJsonFeatureCollection = <T extends Geometry, K>(): FeatureCollection<T, K> => {
	return Object.assign({ features: [], type: 'FeatureCollection' });
};
