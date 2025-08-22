'use client';

/* * */

import { MAP_STYLES } from '@/components/map/configs/styles';
import { MapViewAttribution } from '@/components/map/view/MapViewAttribution';
import { useMapViewContext } from '@/components/map/view/MapViewContext';
import { useMapContext } from '@/contexts/Map.context';
import { mapDefaultConfig } from '@/settings/map.settings';
import { FullscreenControl, GeolocateControl, Map, type MapLayerMouseEvent, NavigationControl, ScaleControl, type ViewStateChangeEvent } from '@vis.gl/react-maplibre';
import { type PropsWithChildren, useCallback, useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export interface MapViewBasemapProps {
	id: string
	interactiveLayerIds?: string[]
	onClick?: (e: MapLayerMouseEvent) => void
	onContextMenu?: (e: MapLayerMouseEvent) => void
	onDrag?: (e: ViewStateChangeEvent) => void
	onDragEnd?: (e: ViewStateChangeEvent) => void
	onDragStart?: (e: ViewStateChangeEvent) => void
	onMouseDrag?: (e: ViewStateChangeEvent) => void
	onMouseEnter?: (e: MapLayerMouseEvent) => void
	onMouseLeave?: (e: MapLayerMouseEvent) => void
	onMouseOut?: (e: MapLayerMouseEvent) => void
	onMouseOver?: (e: MapLayerMouseEvent) => void
	onZoom?: (e: ViewStateChangeEvent) => void
}

/* * */

export function MapViewBasemap({ children, id, interactiveLayerIds = [], onClick, onContextMenu, onDragEnd, onDragStart, onMouseEnter, onMouseLeave, onMouseOut, onMouseOver, onZoom }: PropsWithChildren<MapViewBasemapProps>) {
	//

	//
	// A. Setup variables

	const mapContext = useMapContext();
	const mapViewContext = useMapViewContext();

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
		mapViewContext.actions.toggleCursor('pointer');
		if (onMouseEnter) onMouseEnter(event);
	}, []);

	const handleOnContextMenu = useCallback((event: MapLayerMouseEvent) => {
		console.log('Map Right Click', event.lngLat);
		if (onContextMenu) onContextMenu(event);
	}, []);

	const handleOnMouseLeave = useCallback((event: MapLayerMouseEvent) => {
		mapViewContext.actions.toggleCursor('auto');
		if (onMouseLeave) onMouseLeave(event);
	}, []);

	const handleOnDragStart = useCallback((event: ViewStateChangeEvent) => {
		mapViewContext.actions.toggleCursor('grab');
		mapViewContext.actions.toggleAutoZoom(false);
		if (onDragStart) onDragStart(event);
	}, []);

	const handleOnDragEnd = useCallback((event: ViewStateChangeEvent) => {
		mapViewContext.actions.toggleCursor('auto');
		if (onDragEnd) onDragEnd(event);
	}, []);

	const handleOnZoom = useCallback((event: ViewStateChangeEvent) => {
		mapViewContext.actions.toggleAutoZoom(false);
		if (onZoom) onZoom(event);
	}, []);

	//
	// C. Render components

	return (
		<Map
			ref={mapViewContext.ref.map}
			attributionControl={false}
			cursor={mapViewContext.flags.cursor}
			id={id}
			initialViewState={mapDefaultConfig.initialViewState}
			interactive={true}
			interactiveLayerIds={interactiveLayerIds}
			mapStyle={currentMapStyleConfig.value}
			maxZoom={currentMapStyleConfig.max_zoom}
			minZoom={currentMapStyleConfig.min_zoom}
			onClick={onClick}
			onContextMenu={handleOnContextMenu}
			onDragEnd={handleOnDragEnd}
			onDragStart={handleOnDragStart}
			onLoad={mapViewContext.actions.initMap}
			onMouseEnter={handleOnMouseEnter}
			onMouseLeave={handleOnMouseLeave}
			onMouseOut={onMouseOut}
			onMouseOver={onMouseOver}
			onZoom={handleOnZoom}
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
