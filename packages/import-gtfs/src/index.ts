/* * */

import { processCalendarDatesFile, processCalendarFile, processRoutesFile, processShapesFile, processStopsFile, processStopTimesFile, processTripsFile } from '@/processors/index.js';
import { type GtfsSQLTables, type ImportGtfsContext, type ImportGtfsToDatabaseConfig } from '@/types.js';
import { downloadAndExtractGtfs } from '@/utils/extract-file.js';
import { initGtfsSqlTables } from '@/utils/init-tables.js';
import TIMETRACKER from '@helperkits/timer';
import { type Plan } from '@tmlmobilidade/types';
import { Logs } from '@tmlmobilidade/utils';

/* * */

/* * */
/* MAIN FUNCTION */

export async function importGtfsToDatabase(plan: Plan, config: ImportGtfsToDatabaseConfig = {}): Promise<GtfsSQLTables> {
	try {
		//

		const globalTimer = new TIMETRACKER();

		Logs.info(`Importing ${plan._id} GTFS to database...`);

		//
		// Initialize context for the current plan

		const context: ImportGtfsContext = {
			counters: {
				calendar_dates: 0,
				hashed_shapes: 0,
				hashed_trips: 0,
				shapes: 0,
				stop_times: 0,
				trips: 0,
			},
			gtfs: initGtfsSqlTables(),
			plan: plan,
			referenced_route_ids: new Set<string>(),
			referenced_shape_ids: new Set<string>(),
			workdir: await downloadAndExtractGtfs(plan),
		};

		// Process GTFS files in the correct order

		await processCalendarFile(context, config.start_date ?? plan.gtfs_feed_info.feed_start_date, config.end_date ?? plan.gtfs_feed_info.feed_end_date);
		await processCalendarDatesFile(context, config.start_date ?? plan.gtfs_feed_info.feed_start_date, config.end_date ?? plan.gtfs_feed_info.feed_end_date);

		await processTripsFile(context);
		await processRoutesFile(context);
		await processShapesFile(context);
		await processStopsFile(context);
		await processStopTimesFile(context);

		Logs.success(`Finished importing GTFS to database for plan "${plan._id}" in ${globalTimer.get()}.`, 0);
		Logs.divider();

		Logs.terminate(`Finished importing GTFS to database in ${globalTimer.get()}.`);

		return context.gtfs;

		//
	}
	catch (error) {
		Logs.error('Error parsing plan.', error);
		throw error;
	}
}
