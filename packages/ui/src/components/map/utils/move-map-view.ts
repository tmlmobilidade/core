/* * */

import { mapDefaultValues } from '@/settings/map.settings';
import * as turf from '@turf/turf';
import { MapRef } from '@vis.gl/react-maplibre';
import { type Position } from 'geojson';

/**
 *
 * @param mapObject THe map that should be manipulated
 * @param coordinates The destination coordinates to move the map to
 * @param options Optional settings to customize the movement
 */
export const moveMap = (mapObject: MapRef, coordinates: Position) => {
	//

	//
	// Validate the input parameters

	if (!mapObject) return;
	if (!coordinates || !coordinates.length) return;

	//
	// Get map current zoom level

	const currentZoom = mapObject.getZoom();
	const currentZoomWithMargin = currentZoom + mapDefaultValues.zoom_margin;
	const thresholdZoomWithMargin = mapDefaultValues.zoom + mapDefaultValues.zoom_margin;

	//
	// Check if the given coordinates are inside the currently rendered map bounds

	const currentMapBounds = mapObject.getBounds().toArray();
	if (!currentMapBounds || currentMapBounds.length !== 2 || !currentMapBounds[0] || !currentMapBounds[1]) return;
	const isInside = turf.booleanIntersects(turf.point(coordinates), turf.bboxPolygon([...currentMapBounds[0], ...currentMapBounds[1]]));

	//
	// If the given coordinates are visible and the zoom is not too far back (plus a little margin)...

	if (isInside && currentZoomWithMargin > (thresholdZoomWithMargin * 1.15)) {
		// ...then simply ease to it.
		// mapObject.easeTo({ center: coordinates, duration: mapDefaultValues.speed * 0.25, zoom: currentZoom });
	}
	else {
		// If the zoom is too far, or the given coordinates are not visible, then fly to it
		// mapObject.flyTo({ center: coordinates, duration: mapDefaultValues.speed, zoom: thresholdZoomWithMargin });
	}

	//
};
