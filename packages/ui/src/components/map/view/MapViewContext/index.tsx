'use client';

/* * */

import { centerMapView } from '@/components/map/utils/center-map-view';
import { loadMapAssets } from '@/components/map/utils/load-map-assets';
import { type MapRef } from '@vis.gl/react-maplibre';
import { type Feature, type FeatureCollection, type GeoJsonProperties, type Geometry } from 'geojson';
import { type MapLibreEvent } from 'maplibre-gl';
import { createContext, type PropsWithChildren, type RefObject, useContext, useEffect, useMemo, useRef, useState } from 'react';

/* * */

interface MapViewContextState {
	actions: {
		centerMapOnFeatures: () => void
		initMap: (event: MapLibreEvent) => void
		registerOverlaySource: (sourceId: string, data: Feature<Geometry, GeoJsonProperties>[] | FeatureCollection<Geometry, GeoJsonProperties>) => void
		toggleAutoZoom: (value?: boolean) => void
		unregisterOverlaySource: (sourceId: string) => void
	}
	flags: {
		auto_zoom: boolean
		loading: boolean
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

	const [flagLoading, setFlagLoading] = useState<boolean>(true);
	const [flagAutoZoom, setFlagAutoZoom] = useState<boolean>(true);

	//
	// B. Handle actions

	useEffect(() => {
		// Skip if map is loading or Auto Zoom is disabled
		if (flagLoading || !flagAutoZoom) return;
		// Center the map on the registered sources
		centerMapOnFeatures();
	}, [flagLoading, flagAutoZoom]);

	const initMap = (event: MapLibreEvent) => {
		console.log('map loaded');
		loadMapAssets(event.target);
		setFlagLoading(false);
	};

	const registerOverlaySource = (sourceId: string, data: Feature<Geometry, GeoJsonProperties>[] | FeatureCollection<Geometry, GeoJsonProperties>) => {
		// If the source is a FeatureCollection then register the features
		if ('features' in data) registeredSources.current.set(sourceId, data.features);
		// If the source is an array of features then register them
		else registeredSources.current.set(sourceId, data);
	};

	const unregisterOverlaySource = (sourceId: string) => {
		registeredSources.current.delete(sourceId);
	};

	const centerMapOnFeatures = () => {
		// Skip if the map is not available
		if (!mapRef.current) return;
		// Get the features to center the map on
		const features = Array.from(registeredSources.current.values()).flat();
		// Center the map
		centerMapView(mapRef.current, features);
		// Re-enable auto zoom, if it was disabled
		toggleAutoZoom(true);
	};

	const toggleAutoZoom = (value?: boolean) => {
		if (value !== undefined) setFlagAutoZoom(value);
		else setFlagAutoZoom(prev => !prev);
	};

	//
	// C. Define context value

	const contextValue: MapViewContextState = useMemo(() => ({
		actions: {
			centerMapOnFeatures,
			initMap,
			registerOverlaySource,
			toggleAutoZoom,
			unregisterOverlaySource,
		},
		flags: {
			auto_zoom: flagAutoZoom,
			loading: flagLoading,
		},
		ref: {
			map: mapRef,
		},
	}), [
		flagAutoZoom,
		flagLoading,
	]);

	//
	// D. Render components

	return (
		<MapViewContext.Provider value={contextValue}>
			{children}
		</MapViewContext.Provider>
	);

	//
};
