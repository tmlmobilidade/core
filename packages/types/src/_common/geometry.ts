import { z } from 'zod';

/* * */

//
// Define schemas using constants

export const geometrySchema = z.object({
	coordinates: z.array(z.array(z.number())),
	type: z.string(),
});

//
// Define types based on schemas

export type Geometry = z.infer<typeof geometrySchema>;

/* * */

export type GeometrySchema = z.infer<typeof geometrySchema>;
