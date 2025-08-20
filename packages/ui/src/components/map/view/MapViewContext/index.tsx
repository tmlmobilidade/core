'use client';

/* * */

import { centerMapView } from '@/components/map/utils/center-map-view';
import { type MapRef } from '@vis.gl/react-maplibre';
import { Feature } from 'geojson';
import { createContext, type PropsWithChildren, type RefObject, useContext, useRef } from 'react';

/* * */

interface MapViewContextState {
	actions: {
		centerMapOnFeatures: () => void
		registerSourceIds: (sourceIds: string[]) => void
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

	const registeredSourceIds = useRef<Set<string>>(new Set());

	//
	// B. Handle actions

	const registerSourceIds = (sourceIds: string[]) => {
		sourceIds.forEach(id => registeredSourceIds.current.add(id));
	};

	const centerMapOnFeatures = () => {
		// Skip if the map is not available
		if (!mapRef.current) return;
		// Get the features to center the map on
		let features: Feature[] = [];
		registeredSourceIds.current.forEach((sourceId) => {
			const sourceFeatures = mapRef.current?.querySourceFeatures(sourceId);
			if (sourceFeatures) features = features.concat(sourceFeatures);
		});
		// Center the map
		centerMapView(mapRef.current, features);
	};

	//
	// C. Define context value

	const contextValue: MapViewContextState = {
		actions: {
			centerMapOnFeatures,
			registerSourceIds,
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
