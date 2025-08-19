'use client';

/* * */

import { type Stop } from '@tmlmobilidade/types';
import { getBaseGeoJsonFeatureCollectionPoint, getCssVariableValue } from '@tmlmobilidade/utils';
import { Layer, type MapMouseEvent, Popup, Source, useMap } from '@vis.gl/react-maplibre';
import { useEffect, useMemo, useState } from 'react';

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

	const [circleColorHexValue, setCircleColorHexValue] = useState<string>('#000000');
	const [borderColorHexValue, setBorderColorHexValue] = useState<string>('#000000');

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

	useEffect(() => {
		// Refetch the value every 300 ms
		const interval = setInterval(() => {
			setCircleColorHexValue(getCssVariableValue('--color-background'));
		}, 300);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		// Refetch the value every 300 ms
		const interval = setInterval(() => {
			setBorderColorHexValue(getCssVariableValue('--color-primary'));
		}, 300);
		return () => clearInterval(interval);
	}, []);

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
					offset={12}
				>
					{hoveredFeature.properties.name}
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
						9,
						['case', ['boolean', ['feature-state', 'active'], false], 5, 1],
						26,
						['case', ['boolean', ['feature-state', 'active'], false], 25, 20],
					],
					'circle-stroke-color': borderColorHexValue,
					'circle-stroke-width': [
						'interpolate',
						['linear'],
						['zoom'],
						9,
						1,
						26,
						['case', ['boolean', ['feature-state', 'active'], false], 8, 7],
					],
				}}
			/>

		</Source>
	);

	//
}
