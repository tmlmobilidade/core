'use client';
import { ComponentWrapper, Grid, Surface } from '@tmlmobilidade/ui';

export default function SurfaceExample() {
	return (
		<ComponentWrapper>
			<Grid columns="abc">
				<Surface align="start" overflow="hidden">
					BUS
				</Surface>

				<Surface align="center" variant="transparent">
					TRAIN
				</Surface>

				<Surface align="center" overflow="scroll" variant="transparent">
					METROOOOOOOOOOOOOOOOOOOOOOOOO
					METROOOOOOOOOOOOOOOOOOOOOOOOO
					METROOOOOOOOOOOOOOOOOOOOOOOOO
					METROOOOOOOOOOOOOOOOOOOOOOOOO
				</Surface>

				<Surface align="end" overflow="auto">
					Ship
				</Surface>
			</Grid>

		</ComponentWrapper>
	);
}
