'use client';

/* * */

import { centerMapView } from '@/components/map/utils/center-map-view';
import { type MapRef } from '@vis.gl/react-maplibre';
import { type Feature, type FeatureCollection, type GeoJsonProperties, type Geometry } from 'geojson';
import { createContext, type PropsWithChildren, type RefObject, useContext, useRef } from 'react';

/* * */

interface MapViewContextState {
	actions: {
		centerMapOnFeatures: () => void
		registerSource: (id: string, data: Feature<Geometry, GeoJsonProperties>[] | FeatureCollection<Geometry, GeoJsonProperties>) => void
	}
	ref: {
		map: RefObject<MapRef | null>
	}
}

/* * */

const MapViewContext = createContext<MapViewContextState | undefined>(undefined);

export function useMapViewContext() {
	const context = useContext(MapViewContext);
	if (!context) {
		throw new Error('useMapViewContext must be used within a MapViewContextProvider');
	}
	return context;
}

/* * */

export const MapViewContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const mapRef = useRef<MapRef | null>(null);

	const registeredSources = useRef<Map<string, Feature<Geometry, GeoJsonProperties>[]>>(new Map());

	//
	// B. Handle actions

	const registerSource = (sourceId: string, data: Feature<Geometry, GeoJsonProperties>[] | FeatureCollection<Geometry, GeoJsonProperties>) => {
		// If the source is a FeatureCollection then register the features
		if ('features' in data) registeredSources.current.set(sourceId, data.features);
		// If the source is an array of features then register them
		else registeredSources.current.set(sourceId, data);
	};

	const centerMapOnFeatures = () => {
		// Skip if the map is not available
		if (!mapRef.current) return;
		// Get the features to center the map on
		const features = Array.from(registeredSources.current.values()).flat();
		// Center the map
		centerMapView(mapRef.current, features);
	};

	//
	// C. Define context value

	const contextValue: MapViewContextState = {
		actions: {
			centerMapOnFeatures,
			registerSource,
		},
		ref: {
			map: mapRef,
		},
	};

	//
	// D. Render components

	return (
		<MapViewContext.Provider value={contextValue}>
			{children}
		</MapViewContext.Provider>
	);

	//
};
