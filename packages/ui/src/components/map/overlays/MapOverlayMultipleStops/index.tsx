'use client';

/* * */

import { useCssVariable } from '@/hooks/use-css-variable';
import { type Stop } from '@tmlmobilidade/types';
import { getBaseGeoJsonFeatureCollectionPoint } from '@tmlmobilidade/utils';
import { Layer, type MapMouseEvent, Popup, Source, useMap } from '@vis.gl/react-maplibre';
import { useEffect, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export const MapOverlayMultipleStopsPrimaryLayerId = 'overlay:multiple-stops:layer:points';
export const MapOverlayMultipleStopsInteractiveLayerIds = ['overlay:multiple-stops:layer:points'];

/* * */

interface MapOverlayMultipleStopsProps {
	data?: null | Stop[]
	onClick?: (value: Stop) => void
	presentBeforeId?: string
}

/* * */

export function MapOverlayMultipleStops({ data, onClick, presentBeforeId }: MapOverlayMultipleStopsProps) {
	//

	//
	// A. Setup variables

	const mapCollection = useMap();

	const [hoveredFeature, setHoveredFeature] = useState<GeoJSON.Feature<GeoJSON.Point, Stop> | null>(null);

	const circleColorHexValue = useCssVariable('--color-primary', '#000000');
	const borderColorHexValue = useCssVariable('--color-secondary', '#000000');

	//
	// B. Transform data

	const stopsAsGeojsonFC = useMemo(() => {
		// Prepare an empty feature collection
		const baseGeoJson = getBaseGeoJsonFeatureCollectionPoint<Stop>();
		// Skip if no data is provided
		if (!data) return baseGeoJson;
		// Add the features to the base GeoJSON
		baseGeoJson.features = data.map(item => ({
			geometry: {
				coordinates: [item.longitude, item.latitude],
				type: 'Point',
			},
			properties: item,
			type: 'Feature',
		}));
		// Return the collection
		return baseGeoJson;
	}, [data]);

	//
	// C. Handle actions

	const handleClickEvent = (event: MapMouseEvent) => {
		const relevantFeature = event.target
			.queryRenderedFeatures(event.point)
			.find(feature => MapOverlayMultipleStopsInteractiveLayerIds.includes(feature.layer.id));
		if (!relevantFeature) return;
		if (onClick) onClick(relevantFeature.properties as Stop);
	};

	const handleMouseOverEvent = (event: MapMouseEvent) => {
		const relevantFeature = event.target
			.queryRenderedFeatures(event.point)
			.find(feature => MapOverlayMultipleStopsInteractiveLayerIds.includes(feature.layer.id));
		if (!relevantFeature) return setHoveredFeature(null);
		setHoveredFeature(relevantFeature as unknown as GeoJSON.Feature<GeoJSON.Point, Stop>);
	};

	useEffect(() => {
		// Skip if no map collection is available
		if (!mapCollection) return;
		// Attach a click event listener to each map
		// so that when a feature is clicked, we can handle it.
		Object
			.entries(mapCollection)
			.filter(entry => entry[0] !== 'current')
			.forEach((entry) => {
				const mapObject = entry[1];
				if (!mapObject) return;
				mapObject.on('click', handleClickEvent);
				mapObject.on('mousemove', handleMouseOverEvent);
			});
	}, [mapCollection]);

	//
	// C. Render components

	return (
		<Source data={stopsAsGeojsonFC} id="overlay:multiple-stops:source:points" type="geojson" generateId>

			{hoveredFeature && (
				<Popup
					anchor="bottom"
					closeButton={false}
					latitude={hoveredFeature.geometry.coordinates[1] ?? 0}
					longitude={hoveredFeature.geometry.coordinates[0] ?? 0}
					maxWidth="500px"
					offset={12}
				>
					<div className={styles.popup}>
						<span className={styles.id}>#{hoveredFeature.properties._id}</span>
						<span className={styles.name}>{hoveredFeature.properties.name}</span>
					</div>
				</Popup>
			)}

			<Layer
				beforeId={presentBeforeId}
				id={MapOverlayMultipleStopsPrimaryLayerId}
				source="overlay:multiple-stops:source:points"
				type="circle"
				paint={{
					'circle-color': circleColorHexValue,
					'circle-pitch-alignment': 'map',
					'circle-radius': [
						'interpolate',
						['linear'],
						['zoom'],
						9, // min zoom level
						1, // min radius
						26, // max zoom level
						22, // max radius
					],
					'circle-stroke-color': borderColorHexValue,
					'circle-stroke-width': [
						'interpolate',
						['linear'],
						['zoom'],
						9, // min zoom level
						1, // min stroke width
						26, // max zoom level
						10, // max stroke width
					],
				}}
			/>

		</Source>
	);

	//
}
