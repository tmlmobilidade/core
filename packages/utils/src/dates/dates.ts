/* * */

import { OperationalDate, UnixTimestamp } from '@tmlmobilidade/types';
import { type DateObjectUnits, DateTime, type DurationObjectUnits } from 'luxon';

import { type DatesFormat, Formats, OPERATIONAL_DATE_FORMAT } from './format.js';
import { type TimezoneIdentified, timezoneList, timezoneListSchema } from './types.js';

/* * */

interface DatesConstructor {
	iso: null | string
	js_date: Date
	operational_date: OperationalDate
	timezone?: TimezoneIdentified
	unix_timestamp: UnixTimestamp
}

/* * */

class Dates {
	//

	//
	// Static properties

	static get FORMATS() { return Formats; }
	static get TIMEZONE_LIST() { return timezoneList; }
	static get TIMEZONE_LIST_VALUES() { return timezoneListSchema.Values; }

	//
	// Instance properties

	public iso: null | string;
	public js_date: Date;
	public operational_date: OperationalDate;
	public timezone: TimezoneIdentified;
	public unix_timestamp: UnixTimestamp;

	//
	// Constructor

	constructor({ iso, js_date, operational_date, timezone = 'Europe/Lisbon', unix_timestamp }: DatesConstructor) {
		this.timezone = timezone;
		this.operational_date = operational_date;
		this.unix_timestamp = unix_timestamp;
		this.iso = iso ?? null;
		this.js_date = js_date;
	}

	//
	// Static methods

	/**
	 * Creates a Dates object from a string using a specified format
	 * @param text - The date/time string to parse
	 * @param format - The format string (see Luxon tokens documentation)
	 * @returns A new Dates object parsed from the string
	 */
	static fromFormat(text: string, format: string): Dates {
		const dateTime = DateTime.fromFormat(text, format);

		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from a JavaScript Date object
	 * @param date - The JavaScript Date object to convert
	 * @returns A new Dates object created from the Date
	 */
	static fromJSDate(date: Date): Dates {
		const dateTime = DateTime.fromJSDate(date);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from Unix epoch milliseconds
	 * @param millis - The number of milliseconds since Unix epoch
	 * @returns A new Dates object created from the milliseconds timestamp
	 */
	static fromMillis(millis: number): Dates {
		const dateTime = DateTime.fromMillis(millis);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from an operational date string
	 * @param date - The operational date in 'yyyyMMdd' format
	 * @returns A new Dates object created from the operational date
	 */
	static fromOperationalDate(date: OperationalDate | string): Dates {
		const dateTime = DateTime.fromFormat(date, OPERATIONAL_DATE_FORMAT);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: dateTime.toFormat(OPERATIONAL_DATE_FORMAT) as OperationalDate,
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from Unix epoch seconds
	 * @param seconds - The number of seconds since Unix epoch
	 * @returns A new Dates object created from the seconds timestamp
	 */
	static fromSeconds(seconds: number): Dates {
		const dateTime = DateTime.fromSeconds(seconds);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns a new Dates object with the current date and time
	 * @returns {Dates} A new Dates object with the current date and time
	 */
	static now(): Dates {
		const unix_timestamp = DateTime.now().toMillis() as UnixTimestamp;
		return new Dates({
			iso: DateTime.now().toISO(),
			js_date: DateTime.now().toJSDate(),
			operational_date: this.prototype.getOperationalDate(unix_timestamp),
			unix_timestamp,
		});
	}

	/**
	 * Returns a new Dates object with the current date and time minus a duration
	 * @param duration - The duration to subtract
	 * @returns A new Dates object with the current date and time minus a duration
	 */
	minus(duration: DurationObjectUnits): Dates {
		if (!this.iso) {
			throw new Error('ISO date is not set');
		}

		const dateTime = DateTime.fromISO(this.iso).minus(duration);

		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns a new Dates object with the current date and time plus a duration
	 * @param duration - The duration to add
	 * @returns A new Dates object with the current date and time plus a duration
	 */
	plus(duration: DurationObjectUnits): Dates {
		if (!this.iso) {
			throw new Error('ISO date is not set');
		}

		const dateTime = DateTime.fromISO(this.iso).plus(duration);

		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
     * Sets the date or time for the Dates object.
     * @param timezone - The timezone to set in the format of an IANA timezone
     * @returns The Dates object
     */
	set(dateOrTime: DateObjectUnits): Dates {
		if (!this.iso) {
			throw new Error('ISO date is not set');
		}

		const dateTime = DateTime.fromISO(this.iso).set(dateOrTime);

		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
     * Sets the timezone for the Dates object
     * @param timezone - The timezone to set in the format of an IANA timezone
     * @returns The Dates object
     */
	setZone(timezone: TimezoneIdentified): Dates {
		this.timezone = timezone;
		const dateTime = DateTime.fromMillis(this.unix_timestamp).setZone(timezone);

		return new Dates({
			iso: DateTime.fromMillis(this.unix_timestamp).setZone(timezone).toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toMillis() as UnixTimestamp),
			timezone,
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns the date as a string in the specified format
	 * @param format - The format string (see Luxon tokens documentation)
	 * @returns The date as a string in the specified format
	 */
	toLocaleString(format: DatesFormat, locale?: string): string {
		if (!this.iso) {
			throw new Error('ISO date is not set');
		}

		const dateTime = DateTime.fromISO(this.iso).setZone(this.timezone);

		if (locale) {
			dateTime.setLocale(locale);
		}

		return dateTime.toLocaleString(format);
	}

	//
	// Private methods

	/**
	 * Returns the operational date based on the provided timestamp and format.
	 *
	 * @param timestamp - The timestamp to be parsed.
	 * @returns The operational date in the yyyyLLdd format.
	 */
	private getOperationalDate(timestamp: UnixTimestamp): OperationalDate {
		//
		// Get the date object
		const dateObject = DateTime.fromMillis(timestamp).setZone(this.timezone);

		//
		// Check if the time is between 00:00 and 03:59.
		// The operational date is between 04:00 and 03:59 of the following day.

		let operational_date: string;

		if (dateObject.hour < 4) {
			// If true, return the previous day in the yyyyLLdd format
			const previousDay = dateObject.minus({ days: 1 });
			operational_date = previousDay.toFormat('yyyyLLdd');
		}
		else {
			// Else, return the current day in the yyyyLLdd format
			operational_date = dateObject.toFormat('yyyyLLdd');
		}

		//
		// Validate the operational date and return it

		return operational_date as OperationalDate;

		//
	}
}

export { Dates, DatesFormat, TimezoneIdentified };
