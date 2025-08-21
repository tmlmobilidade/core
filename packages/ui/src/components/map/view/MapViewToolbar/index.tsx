'use client';

/* * */

import { Button } from '@/components/buttons';
import { SegmentedControl, Switch } from '@/components/common';
import { Spacer } from '@/components/layout';
import { MAP_STYLES } from '@/components/map/configs/styles';
import { useMapViewContext } from '@/components/map/view/MapViewContext';
import { useMapContext } from '@/contexts';
import { IconCrosshair } from '@tabler/icons-react';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

export function MapViewToolbar() {
	//

	//
	// A. Setup variables

	const mapContext = useMapContext();
	const mapViewContext = useMapViewContext();

	//
	// B. Transform data

	const mapStyleOptions = useMemo(() => {
		return Object
			.entries(MAP_STYLES)
			.map(([key, style]) => ({ label: style.label, value: key }));
	}, [MAP_STYLES]);

	//
	// C. Render components

	return (
		<div className={styles.toolbar}>
			<Switch checked={mapContext.flags.scroll_zoom} label="Permitir Zoom" onChange={() => mapContext.actions.toggleScrollZoom()} />
			<Switch checked={mapViewContext.flags.auto_zoom} label="Auto Zoom" onChange={() => mapViewContext.actions.toggleAutoZoom()} />
			<Spacer />
			<Button icon={<IconCrosshair />} label="Centrar" onClick={mapViewContext.actions.centerMapOnFeatures} />
			<SegmentedControl data={mapStyleOptions} onChange={() => mapContext.actions.toggleStyle()} value={mapContext.flags.style} />
		</div>
	);

	//
}
