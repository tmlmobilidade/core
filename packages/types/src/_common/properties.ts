import { z } from 'zod';

/* * */

//
// Define schemas using constants

export const propertiesSchema = z.object({
	area_ha: z.number(),
	district_id: z.string().length(2),
	id: z.string().length(4),
	name: z.string(),
});

//
// Define types based on schemas

export type Properties = z.infer<typeof propertiesSchema>;

/* * */

export type PropertiesSchema = z.infer<typeof propertiesSchema>;
