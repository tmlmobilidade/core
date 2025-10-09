/* * */

import { type ImportGtfsContext } from '@/types.js';
import { parseCsvFile } from '@/utils/parse-csv.js';
import TIMETRACKER from '@helperkits/timer';
import { GTFS_Calendar_Raw, validateGtfsCalendar } from '@tmlmobilidade/types';
import { OperationalDate } from '@tmlmobilidade/types';
import { Dates, getOperationalDatesFromRange, Logs } from '@tmlmobilidade/utils';
import fs from 'node:fs';

/**
 * Processes the calendar.txt file from the GTFS dataset.
 * It extracts service_ids that are valid between the given start_date and end_date,
 * and populates the context's calendar_dates map with operational dates for each service_id.
 * @param context The import GTFS context to populate with calendar dates.
 * @param startDate The start date of the range to filter service_ids.
 * @param endDate The end date of the range to filter service_ids.
 */
export async function processCalendarFile(context: ImportGtfsContext, startDate: OperationalDate, endDate: OperationalDate): Promise<void> {
	try {
		//

		const calendarParseTimer = new TIMETRACKER();

		Logs.info(`Reading zip entry "calendar.txt"...`);

		const parseEachRow = async (data: GTFS_Calendar_Raw) => {
			//

			//
			// Validate the current row against the proper type

			const validatedData = validateGtfsCalendar(data);

			//
			// Check if this service_id is between the given start_date and end_date.
			// Clip the service_id's start and end dates to the given start and end dates.

			let serviceIdStartDate = validatedData.start_date;
			let serviceIdEndDate = validatedData.end_date;

			if (serviceIdEndDate < startDate || serviceIdStartDate > endDate) return;

			if (serviceIdStartDate < startDate) serviceIdStartDate = startDate;
			if (serviceIdEndDate > endDate) serviceIdEndDate = endDate;

			//
			// If we're here, it means the service_id is valid between the given dates.
			// For the configured weekly schedule, create the individual operational dates
			// for each day of the week that is active.

			const allOperationalDatesInRange = getOperationalDatesFromRange(serviceIdStartDate, serviceIdEndDate);

			const validOperationalDates = new Set<OperationalDate>();

			for (const currentDate of allOperationalDatesInRange) {
				const dayOfWeek = Dates.fromOperationalDate(currentDate, 'Europe/Lisbon').toFormat('c');
				if (dayOfWeek === '1' && validatedData.monday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '2' && validatedData.tuesday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '3' && validatedData.wednesday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '4' && validatedData.thursday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '5' && validatedData.friday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '6' && validatedData.saturday === 1) validOperationalDates.add(currentDate);
				if (dayOfWeek === '7' && validatedData.sunday === 1) validOperationalDates.add(currentDate);
			}

			//
			// Save the valid operational dates for this service_id

			context.gtfs.calendar_dates.set(validatedData.service_id, Array.from(validOperationalDates));

			context.counters.calendar_dates += validOperationalDates.size;

			//
		};

		//
		// Setup the CSV parsing operation only if the file exists

		if (fs.existsSync(`${context.workdir.extract_dir_path}/calendar.txt`)) {
			await parseCsvFile(`${context.workdir.extract_dir_path}/calendar.txt`, parseEachRow);
			Logs.success(`Finished processing "calendar.txt": ${context.gtfs.calendar_dates.size} rows saved in ${calendarParseTimer.get()}.`, 1);
		}
		else {
			Logs.info(`Optional file "calendar.txt" not found. This may or may not be an error. Proceeding...`, 1);
		}

		//
	}
	catch (error) {
		Logs.error('Error processing "calendar.txt" file.', error);
		throw new Error('✖︎ Error processing "calendar.txt" file.');
	}
}
