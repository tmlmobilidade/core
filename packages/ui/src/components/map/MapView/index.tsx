'use client';

/* * */

import { type MapStyle, useMapOptionsContext } from '@/contexts/MapOptions.context';
import { IconsMap } from '@/settings/assets.settings';
import { mapDefaultConfig } from '@/settings/map.settings';
import { useCallback, useEffect, useState } from 'react';
import Map, { FullscreenControl, GeolocateControl, MapLayerMouseEvent, MapRef, NavigationControl, ScaleControl, useMap, ViewStateChangeEvent } from 'react-map-gl/maplibre';

import styles from './styles.module.css';

/* * */

const MAP_LOAD_ASSETS = [
	{ name: 'cmet-bus-delay', sdf: false, url: IconsMap.bus_delay },
	{ name: 'cmet-bus-regular', sdf: false, url: IconsMap.bus_regular },
	{ name: 'cmet-bus-error', sdf: false, url: IconsMap.bus_error },
	{ name: 'cmet-pin', sdf: false, url: IconsMap.pin },
	{ name: 'cmet-shape-direction', sdf: true, url: IconsMap.shape_direction },
	{ name: 'cmet-stop-selected', sdf: false, url: IconsMap.stop_selected },
	{ name: 'cmet-store-busy', sdf: false, url: IconsMap.store_busy },
	{ name: 'cmet-store-closed', sdf: false, url: IconsMap.store_closed },
	{ name: 'cmet-store-open', sdf: false, url: IconsMap.store_open },
];

/* * */

interface Props {
	children: React.ReactNode
	fullscreen?: boolean
	geolocate?: boolean
	id?: string
	interactiveLayerIds?: string[]
	mapObject?: MapRef
	mapStyle?: MapStyle
	navigation?: boolean
	onCenterMap?: () => void
	onClick?: (e: MapLayerMouseEvent) => void
	onDrag?: (e: ViewStateChangeEvent) => void
	onDragEnd?: (e: ViewStateChangeEvent) => void
	onDragStart?: (e: ViewStateChangeEvent) => void
	onMouseDrag?: (e: ViewStateChangeEvent) => void
	onMouseEnter?: (e: MapLayerMouseEvent) => void // When the mouse enters the interactive layer
	onMouseLeave?: (e: MapLayerMouseEvent) => void // When the mouse leaves the interactive layer
	onMouseOut?: (e: MapLayerMouseEvent) => void // When the mouse enters the map
	onMouseOver?: (e: MapLayerMouseEvent) => void // When the mouse leaves the map
	primarySourceId?: string
	scale?: boolean
	scrollZoom?: boolean
	toolbar?: boolean
}

/* * */

export function MapView({
	children,
	fullscreen = true,
	geolocate = true,
	id,
	interactiveLayerIds = [],
	mapStyle,
	navigation = true,
	// onCenterMap,
	onClick,
	onDragEnd,
	onDragStart,
	onMouseEnter,
	onMouseLeave,
	onMouseOut,
	onMouseOver,
	scale = false,
	scrollZoom = true,
	// toolbar = true,
}: Props) {
	//
	// A. Setup variables
	const [cursor, setCursor] = useState<string>('auto');
	const allMaps = useMap();
	const mapOptionsContext = useMapOptionsContext();

	//
	// B. Transform data

	useEffect(() => {
		if (!id || !allMaps || !allMaps[id]) return;
		const mapObject = allMaps[id];
		mapOptionsContext.actions.setMap(mapObject);
		for (const mapLoadAsset of MAP_LOAD_ASSETS) {
			mapObject.loadImage(mapLoadAsset.url).then((image) => {
				mapObject.addImage(mapLoadAsset.name, image.data, { sdf: mapLoadAsset.sdf });
			});
		}
	}, [allMaps, id]);

	const mapStyleValue = mapStyle ?? mapOptionsContext.data.style;

	//
	// C. Handle actions
	const handleOnMouseEnter = useCallback((event: MapLayerMouseEvent) => {
		setCursor('pointer');

		if (onMouseEnter) {
			onMouseEnter(event);
		}
	}, []);

	const handleOnMouseLeave = useCallback((event: MapLayerMouseEvent) => {
		setCursor('auto');

		if (onMouseLeave) {
			onMouseLeave(event);
		}
	}, []);

	const handleOnDragStart = useCallback((event: ViewStateChangeEvent) => {
		setCursor('grab');

		if (onDragStart) {
			onDragStart(event);
		}
	}, []);

	const handleOnDragEnd = useCallback((event: ViewStateChangeEvent) => {
		setCursor('auto');

		if (onDragEnd) {
			onDragEnd(event);
		}
	}, []);

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<Map
				attributionControl={false}
				cursor={cursor}
				id={id || 'map'}
				initialViewState={mapDefaultConfig.initialViewState}
				interactive={!!interactiveLayerIds}
				interactiveLayerIds={interactiveLayerIds}
				mapStyle={mapDefaultConfig.styles[mapStyleValue as keyof typeof mapDefaultConfig.styles] as string}
				maxZoom={mapDefaultConfig.maxZoom}
				minZoom={mapDefaultConfig.minZoom}
				onClick={onClick}
				onDragEnd={handleOnDragEnd}
				onDragStart={handleOnDragStart}
				onMouseEnter={handleOnMouseEnter}
				onMouseLeave={handleOnMouseLeave}
				onMouseOut={onMouseOut}
				onMouseOver={onMouseOver}
				scrollZoom={scrollZoom}
				style={{ height: '100%', width: '100%' }}
			>
				{navigation && <NavigationControl />}
				{fullscreen && <FullscreenControl />}
				{geolocate && <GeolocateControl />}
				{scale && <ScaleControl />}
				<div className={styles.childrenWrapper}>
					{children}
				</div>
			</Map>
			<div className={styles.attributionWrapper}>
				<a href="https://maplibre.org/" target="_blank">MapLibre</a>
				<a href="https://www.openmaptiles.org/" target="_blank">© OpenMapTiles</a>
				<a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>
			</div>
		</div>
	);
}
