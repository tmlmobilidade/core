/* * */

import { DocumentSchema } from '@/_common/document.js';
import { z } from 'zod';

/* * */

//
// Define constants for enum values for better maintainability

const SCOPE_VALUES = ['stop', 'lines'] as const;
const STATUS_VALUES = ['pending', 'accepted', 'declined'] as const;

export const scopeSchema = z.enum(SCOPE_VALUES);
export const statusSchema = z.enum(STATUS_VALUES).default('pending');

export type Scope = z.infer<typeof scopeSchema>;
export type Status = z.infer<typeof statusSchema>;

// Define schemas using constants

export const ProposedChangeSchema = DocumentSchema.extend({
	curr_value: z.any(),
	field: z.string(),
	scope: scopeSchema,
	status: statusSchema,
}).strict();

//
// Define the Proposed Change types

export type ProposedChange<T> = {
	[P in keyof T]: {
		curr_value: T[P]
		field: P
		scope: string
		status: string
	}
}[keyof T];

export const CreateProposedChangeSchema = ProposedChangeSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateProposedChangeSchema = CreateProposedChangeSchema.omit({ created_by: true }).partial();

export type CreateProposedChangeDto = z.infer<typeof CreateProposedChangeSchema>;
export type UpdateProposedChangeDto = z.infer<typeof UpdateProposedChangeSchema>;
