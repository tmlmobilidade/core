import { z } from 'zod';

import { OperationalDate, operationalDateSchema } from './_common/operational-date.js';

export const GtfsFeedInfoSchema = z.object({
	default_lang: z.string().nullish(),
	feed_contact_email: z.string().nullish(),
	feed_contact_url: z.string().nullish(),
	feed_end_date: operationalDateSchema.nullish(),
	feed_lang: z.string(),
	feed_publisher_name: z.string().nullish(),
	feed_publisher_url: z.string().nullish(),
	feed_start_date: operationalDateSchema.nullish(),
	feed_version: z.string().nullish(),
});

export const GtfsAgencySchema = z.object({
	agency_email: z.string().nullish(),
	agency_fare_url: z.string().nullish(),
	agency_id: z.string(),
	agency_lang: z.string().nullish(),
	agency_name: z.string(),
	agency_phone: z.string().nullish(),
	agency_timezone: z.string(),
	agency_url: z.string().nullish(),
});

export type GtfsFeedInfo = Omit<z.infer<typeof GtfsFeedInfoSchema>, 'feed_end_date' | 'feed_start_date'> & {
	feed_end_date?: null | OperationalDate
	feed_start_date?: null | OperationalDate
};

export type GtfsAgency = Omit<z.infer<typeof GtfsAgencySchema>, 'feed_end_date' | 'feed_start_date'> & {
	feed_end_date?: null | OperationalDate
	feed_start_date?: null | OperationalDate
};
