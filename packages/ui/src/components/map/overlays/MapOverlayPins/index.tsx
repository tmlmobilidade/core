'use client';

/* * */

import { useMapViewContext } from '@/components/map/view/MapViewContext';
import { Layer, Source } from '@vis.gl/react-maplibre';
import { type FeatureCollection, type Point } from 'geojson';
import { useEffect } from 'react';

/* * */

export interface MapOverlayPinsPointDataProps {
	id: string
}

/* * */

interface MapOverlayPinsProps {
	id: string
	pinsData?: FeatureCollection<Point, MapOverlayPinsPointDataProps> | null
	visible?: boolean
}

/* * */

export function MapOverlayPins({ id, pinsData, visible = true }: MapOverlayPinsProps) {
	//

	//
	// A. Setup variables

	const mapViewContext = useMapViewContext();

	//
	// B. Handle actions

	useEffect(() => {
		// Register features for sources in this overlay component
		if (pinsData) mapViewContext.actions.registerOverlaySource(`${id}:pins:source:points`, pinsData);
		return () => {
			mapViewContext.actions.unregisterOverlaySource(`${id}:pins:source:points`);
		};
	}, [pinsData]);

	//
	// C. Render components

	if (!pinsData) {
		return null;
	}

	return (
		<Source data={pinsData} id={`${id}:pins:source:points`} type="geojson" generateId>
			<Layer
				id={`${id}:pins:layer:points`}
				source={`${id}:pins:source:points`}
				type="symbol"
				layout={{
					'icon-allow-overlap': true,
					'icon-anchor': 'bottom',
					'icon-ignore-placement': true,
					'icon-image': 'map-pin',
					'icon-offset': [0, 0],
					'icon-pitch-alignment': 'viewport',
					'icon-rotate': 0,
					'icon-size': [
						'interpolate',
						['linear'],
						['zoom'],
						10, // min zoom level
						0.1, // min radius
						25, // max zoom level
						1, // max radius
					],
					'symbol-placement': 'point',
					'visibility': visible ? 'visible' : 'none',
				}}
				paint={{
					'icon-color': '#ffffff',
					'icon-opacity': 1,
				}}
			/>
		</Source>
	);

	//
}
