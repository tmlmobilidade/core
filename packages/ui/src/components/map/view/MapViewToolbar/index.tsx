'use client';

/* * */

import { Button } from '@/components/buttons';
import { SegmentedControl, Switch } from '@/components/common';
import { Spacer } from '@/components/layout';
import { MAP_STYLES } from '@/components/map/configs/styles';
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

	//
	// B. Transform data

	const mapStyleOptions = useMemo(() => {
		return Object.entries(MAP_STYLES).map(([key, style]) => ({
			label: style.label,
			value: key,
		}));
	}, []);

	//
	// C. Render components

	return (
		<div className={styles.toolbar}>
			<Switch checked={mapContext.flags.scroll_zoom} label="Permitir Zoom" onChange={() => mapContext.actions.toggleScrollZoom()} />
			<Spacer />
			<Button icon={<IconCrosshair />} label="Centrar" />
			<SegmentedControl data={mapStyleOptions} onChange={() => mapContext.actions.toggleStyle()} value={mapContext.flags.style} />
		</div>
	);

	//
}
