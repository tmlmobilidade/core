/* * */

import { type DatesFormat, Formats, OPERATIONAL_DATE_FORMAT } from '@/dates/format.js';
import { type TimezoneIdentified, timezoneList, timezoneListSchema } from '@/dates/types.js';
import { type OperationalDate, type UnixTimestamp } from '@tmlmobilidade/types';
import { type DateObjectUnits, DateTime, type DurationObjectUnits } from 'luxon';

/* * */

interface DatesConstructor {
	iso: null | string
	js_date: Date
	operational_date: OperationalDate
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
	public unix_timestamp: UnixTimestamp;

	//
	// Constructor

	constructor({ iso, js_date, operational_date, unix_timestamp }: DatesConstructor) {
		this.iso = iso ?? null;
		this.js_date = js_date;
		this.operational_date = operational_date;
		this.unix_timestamp = unix_timestamp;
	}

	//
	// Static methods

	/**
	 * Creates a Dates object from a string using a specified format
	 * @param text The date/time string to parse
	 * @param format The format string (see Luxon tokens documentation)
	 * @returns A new Dates object parsed from the string
	 */
	static fromFormat(text: string, format: string, timezone: TimezoneIdentified = 'Europe/Lisbon'): Dates {
		const dateTime = DateTime
			.fromFormat(text, format)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from a string in the ISO 8601 format
	 * @param isoText The date/time string to parse
	 * @returns A new Dates object parsed from the string
	 */
	static fromISO(isoText: string): Dates {
		const dateTime = DateTime.fromISO(isoText);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from a JavaScript Date object
	 * @param date The JavaScript Date object to convert
	 * @returns A new Dates object created from the Date
	 */
	static fromJSDate(date: Date, timezone: TimezoneIdentified = 'Europe/Lisbon'): Dates {
		const dateTime = DateTime
			.fromJSDate(date)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from Unix epoch milliseconds
	 * @param millis The number of milliseconds since Unix epoch
	 * @returns A new Dates object created from the milliseconds timestamp
	 */
	static fromMillis(millis: number, timezone: TimezoneIdentified = 'Europe/Lisbon'): Dates {
		const dateTime = DateTime
			.fromMillis(millis)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from an operational date string
	 * @param date The operational date in 'yyyyMMdd' format
	 * @returns A new Dates object created from the operational date
	 */
	static fromOperationalDate(date: OperationalDate | string, timezone: TimezoneIdentified = 'Europe/Lisbon'): Dates {
		const dateTime = DateTime
			.fromFormat(date, OPERATIONAL_DATE_FORMAT)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: dateTime.toFormat(OPERATIONAL_DATE_FORMAT) as OperationalDate,
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Creates a Dates object from Unix epoch seconds
	 * @param seconds The number of seconds since Unix epoch
	 * @returns A new Dates object created from the seconds timestamp
	 */
	static fromSeconds(seconds: number, timezone: TimezoneIdentified = 'Europe/Lisbon'): Dates {
		const dateTime = DateTime
			.fromSeconds(seconds)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns a new Dates object with the current date and time
	 * @returns {Dates} A new Dates object with the current date and time
	 */
	static now(): Dates {
		const dateTime = DateTime.now();
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.prototype.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns the time remaining until a given unix_timestamp (in ms) from now,
	 * as an object with minutes, hours, and days (all as floats, not rounded).
	 * @param unixTimestamp The target timestamp in milliseconds
	 * @returns { minutes: number, hours: number, days: number }
	 */
	static timeUntil(unixTimestamp: UnixTimestamp): { days: number, hours: number, minutes: number } {
		const now = Date.now();
		const diffMs = unixTimestamp - now;

		const minutes = diffMs / (1000 * 60);
		const hours = diffMs / (1000 * 60 * 60);
		const days = diffMs / (1000 * 60 * 60 * 24);

		return { days, hours, minutes };
	}

	/**
	 * Returns a human-readable, localized string for the time remaining until a given unix_timestamp (in ms) from now.
	 * @param unixTimestamp The target timestamp in milliseconds
	 * @param locale Optional locale string (e.g., 'en', 'pt')
	 * @returns A localized string like "2 days, 3 hours, 15 minutes"
	 */
	static timeUntilLocaleString(unixTimestamp: UnixTimestamp, locale: 'en' | 'pt' = 'pt'): string {
		const now = Date.now();
		const diffMs = unixTimestamp - now;

		const parts: string[] = [];

		if (diffMs < 60 * 1000) {
			return locale === 'en' ? 'Arriving' : 'A Chegar';
		}

		const totalMinutes = Math.round(diffMs / (1000 * 60));
		const days = Math.floor(totalMinutes / (60 * 24));
		const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
		const minutes = totalMinutes % 60;

		if (days > 0) {
			parts.push(`${days} ${days === 1 ? locale === 'en' ? 'day' : 'dia' : locale === 'en' ? 'days' : 'dias'}`);
		}
		if (hours > 0) {
			parts.push(`${hours} ${hours === 1 ? locale === 'en' ? 'hour' : 'hora' : locale === 'en' ? 'hours' : 'horas'}`);
		}
		if (minutes > 0 || parts.length === 0) {
			parts.push(`${minutes} ${minutes === 1 ? locale === 'en' ? 'minute' : 'minuto' : locale === 'en' ? 'minutes' : 'minutos'}`);
		}

		return parts.join(', ');
	}

	/**
	 * Returns a new Dates object with the current date and time minus a duration.
	 * @param duration The duration to subtract
	 * @returns A new Dates object with the current date and time minus a duration
	 */
	minus(duration: DurationObjectUnits): Dates {
		if (!this.iso) throw new Error('ISO date is not set.');
		const dateTime = DateTime.fromISO(this.iso).minus(duration);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns a new Dates object with the current date and time plus a duration
	 * @param duration The duration to add
	 * @returns A new Dates object with the current date and time plus a duration
	 */
	plus(duration: DurationObjectUnits): Dates {
		if (!this.iso) throw new Error('ISO date is not set.');
		const dateTime = DateTime.fromISO(this.iso).plus(duration);
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Sets the date and time for the Dates object.
	 * @param dateOrTime The date or time to set, can be an object with DateObjectUnits or a string in ISO format
	 * @param timezone The timezone to set in the format of an IANA timezone
	 * @returns The Dates object
	 */
	set(dateOrTime: DateObjectUnits, timezone?: TimezoneIdentified): Dates {
		if (!this.iso) throw new Error('ISO date is not set.');
		const dateTime = DateTime.fromISO(this.iso).set(dateOrTime);
		if (timezone) dateTime.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Sets the timezone for the Dates object.
	 * @param timezone The timezone to set in the format of an IANA timezone
	 * @returns The Dates object
	 */
	setZone(timezone: TimezoneIdentified): Dates {
		if (!this.iso) throw new Error('ISO date is not set.');
		const dateTime = DateTime
			.fromISO(this.iso)
			.setZone(timezone, { keepLocalTime: true });
		return new Dates({
			iso: dateTime.toISO(),
			js_date: dateTime.toJSDate(),
			operational_date: this.getOperationalDate(dateTime.toISO()),
			unix_timestamp: dateTime.toMillis() as UnixTimestamp,
		});
	}

	/**
	 * Returns the date as a string in the specified format.
	 * @param format The format string (see Luxon tokens documentation)
	 * @returns The date as a string in the specified format
	 */
	toLocaleString(format: DatesFormat, locale?: string): string {
		if (!this.iso) throw new Error('ISO date is not set.');
		const dateTime = DateTime.fromISO(this.iso);
		if (locale) dateTime.setLocale(locale);
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
	private getOperationalDate(isoDate: null | string): OperationalDate {
		if (!isoDate) throw new Error('ISO date is not set.');

		//
		// Get the date object

		const dateObject = DateTime.fromISO(isoDate);

		//
		// Check if the time is between 00:00 and 03:59.
		// The operational date is between 04:00 and 03:59 of the following day.

		let operational_date: string;

		if (dateObject.hour < 4) {
			// If true, return the previous day in the yyyyLLdd format
			const previousDay = dateObject.minus({ days: 1 });
			operational_date = previousDay.toFormat(OPERATIONAL_DATE_FORMAT);
		}
		else {
			// Else, return the current day in the yyyyLLdd format
			operational_date = dateObject.toFormat(OPERATIONAL_DATE_FORMAT);
		}

		//
		// Validate the operational date and return it

		return operational_date as OperationalDate;

		//
	}
}

/* * */

export { Dates, DatesFormat, TimezoneIdentified };
