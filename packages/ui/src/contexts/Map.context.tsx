'use client';

/* * */

import { type MapStyle } from '@/components/map/configs/styles';
import { useLocalStorage } from '@mantine/hooks';
import { MapProvider } from '@vis.gl/react-maplibre';
import { createContext, type PropsWithChildren, useContext } from 'react';

/* * */

interface MapContextState {
	actions: {
		toggleAutoZoom: (value?: boolean) => void
		toggleScrollZoom: (value?: boolean) => void
		toggleStyle: (value?: MapStyle) => void
	}
	flags: {
		auto_zoom: boolean
		scroll_zoom: boolean
		style: MapStyle
	}
}

/* * */

const MapContext = createContext<MapContextState | undefined>(undefined);

export function useMapContext() {
	const context = useContext(MapContext);
	if (!context) {
		throw new Error('useMapContext must be used within a MapContextProvider');
	}
	return context;
}

/* * */

export const MapContextProvider = ({ children }: PropsWithChildren) => {
	//

	//
	// A. Setup variables

	const [flagStyle, setFlagStyle] = useLocalStorage<MapStyle>({ defaultValue: 'map', key: 'map:flags:style' });
	const [flagScrollZoom, setFlagScrollZoom] = useLocalStorage<boolean>({ defaultValue: true, key: 'map:flags:scroll-zoom' });
	const [flagAutoZoom, setFlagAutoZoom] = useLocalStorage<boolean>({ defaultValue: true, key: 'map:flags:auto-zoom' });

	//
	// B. Handle actions

	const toggleAutoZoom = (value?: boolean) => {
		if (value !== undefined) setFlagAutoZoom(value);
		else setFlagAutoZoom(prev => !prev);
	};

	const toggleScrollZoom = (value?: boolean) => {
		if (value !== undefined) setFlagScrollZoom(value);
		else setFlagScrollZoom(prev => !prev);
	};

	const toggleStyle = (value?: MapStyle) => {
		if (value) setFlagStyle(value);
		else setFlagStyle(prev => (prev === 'map' ? 'satellite' : 'map'));
	};

	//
	// C. Define context value

	const contextValue: MapContextState = {
		actions: {
			toggleAutoZoom,
			toggleScrollZoom,
			toggleStyle,
		},
		flags: {
			auto_zoom: flagAutoZoom,
			scroll_zoom: flagScrollZoom,
			style: flagStyle,
		},
	};

	//
	// D. Render components

	return (
		<MapContext.Provider value={contextValue}>
			<MapProvider>
				{children}
			</MapProvider>
		</MapContext.Provider>
	);

	//
};
