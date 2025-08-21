'use client';

/* * */

import { MAP_STYLES } from '@/components/map/configs/styles';
import { MapViewAttribution } from '@/components/map/view/MapViewAttribution';
import { useMapViewContext } from '@/components/map/view/MapViewContext';
import { useMapContext } from '@/contexts/Map.context';
import { mapDefaultConfig } from '@/settings/map.settings';
import { FullscreenControl, GeolocateControl, Map, type MapLayerMouseEvent, NavigationControl, ScaleControl, type ViewStateChangeEvent } from '@vis.gl/react-maplibre';
import { type CSSProperties, type PropsWithChildren, useCallback, useMemo, useState } from 'react';

import styles from './styles.module.css';

/* * */

export interface MapViewBasemapProps {
	id: string
	interactiveLayerIds?: string[]
	onClick?: (e: MapLayerMouseEvent) => void
	onDrag?: (e: ViewStateChangeEvent) => void
	onDragEnd?: (e: ViewStateChangeEvent) => void
	onDragStart?: (e: ViewStateChangeEvent) => void
	onMouseDrag?: (e: ViewStateChangeEvent) => void
	onMouseEnter?: (e: MapLayerMouseEvent) => void
	onMouseLeave?: (e: MapLayerMouseEvent) => void
	onMouseOut?: (e: MapLayerMouseEvent) => void
	onMouseOver?: (e: MapLayerMouseEvent) => void
}

/* * */

export function MapViewBasemap({ children, id, interactiveLayerIds = [], onClick, onDragEnd, onDragStart, onMouseEnter, onMouseLeave, onMouseOut, onMouseOver }: PropsWithChildren<MapViewBasemapProps>) {
	//

	//
	// A. Setup variables

	const mapContext = useMapContext();
	const mapViewContext = useMapViewContext();

	const [mouseCursor, setMouseCursor] = useState<CSSProperties['cursor']>('auto');

	//
	// B. Transform data

	const currentMapStyleConfig = useMemo(() => {
		const currentMapStyle = MAP_STYLES[mapContext.flags.style];
		if (currentMapStyle) return currentMapStyle;
		return MAP_STYLES.map;
	}, [mapContext.flags.style]);

	//
	// C. Handle actions

	const handleOnMouseEnter = useCallback((event: MapLayerMouseEvent) => {
		setMouseCursor('pointer');
		if (onMouseEnter) onMouseEnter(event);
	}, []);

	const handleOnMouseLeave = useCallback((event: MapLayerMouseEvent) => {
		setMouseCursor('auto');
		if (onMouseLeave) onMouseLeave(event);
	}, []);

	const handleOnDragStart = useCallback((event: ViewStateChangeEvent) => {
		setMouseCursor('grab');
		mapViewContext.actions.toggleAutoZoom(false);
		if (onDragStart) onDragStart(event);
	}, []);

	const handleOnDragEnd = useCallback((event: ViewStateChangeEvent) => {
		setMouseCursor('auto');
		if (onDragEnd) onDragEnd(event);
	}, []);

	//
	// C. Render components

	return (
		<Map
			ref={mapViewContext.ref.map}
			attributionControl={false}
			cursor={mouseCursor}
			id={id}
			initialViewState={mapDefaultConfig.initialViewState}
			interactive={true}
			interactiveLayerIds={interactiveLayerIds}
			mapStyle={currentMapStyleConfig.value}
			maxZoom={currentMapStyleConfig.max_zoom}
			minZoom={currentMapStyleConfig.min_zoom}
			onClick={onClick}
			onDragEnd={handleOnDragEnd}
			onDragStart={handleOnDragStart}
			onLoad={mapViewContext.actions.initMap}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
			scrollZoom={mapContext.flags.scroll_zoom}
			style={{ height: '100%', width: '100%' }}
		>
			<NavigationControl />
			<FullscreenControl />
			<GeolocateControl />
			<ScaleControl />
			<div className={styles.children}>
				<MapViewAttribution />
				{children}
			</div>
		</Map>
	);

	//
}
