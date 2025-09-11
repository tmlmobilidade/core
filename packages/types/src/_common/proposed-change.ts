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
	field_path: z.string(),
	field_value: z.any(),
	scope: scopeSchema,
	status: statusSchema,
	target_id: z.string(),
	user_id: z.string(),
}).strict();

export const CreateProposedChangeSchema = ProposedChangeSchema.omit({ _id: true, created_at: true, updated_at: true });
export const UpdateProposedChangeSchema = CreateProposedChangeSchema.omit({ created_by: true }).partial();

//
// Define the Proposed Change types

export type ProposedChange = z.infer<typeof ProposedChangeSchema>;
export type CreateProposedChangeDto = z.infer<typeof CreateProposedChangeSchema>;
export type UpdateProposedChangeDto = z.infer<typeof UpdateProposedChangeSchema>;
