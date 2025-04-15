/* * */

import { DocumentSchema, UnixTimestamp } from '@/common.js';
import { z } from 'zod';

/* * */

//
// Define constants for enum values for better maintainability

const SCOPE_VALUES = [
	'stop',
	'lines',
] as const;

const STATUS_VALUES = [
	'pending', 'accepted', 'declined',
] as const;

//
// Define schemas using constants

export const scopeSchema = z.enum(SCOPE_VALUES);
export const statusSchema = z.enum(STATUS_VALUES).default('pending');

export const ProposedChangeSchema = DocumentSchema.extend({

	field_path: z.string(),

	field_value: z.any(),

	scope: scopeSchema,

	status: statusSchema,

	target_id: z.string(),

	user_id: z.string(),

}).strict();

export const CreateProposedChangeSchema = ProposedChangeSchema
	.omit({ _id: true, created_at: true, updated_at: true });

export const UpdateProposedChangeSchema = ProposedChangeSchema
	.omit({ _id: true, created_at: true, updated_at: true })
	.partial();

//
// Define types based on schemas

export type Scope = z.infer<typeof scopeSchema>;
export type Status = z.infer<typeof statusSchema>;

//
// Define the Proposed Change interface

export interface ProposedChange
	extends Omit<
		z.infer<typeof ProposedChangeSchema>,
		'created_at'
		| 'field_path'
		| 'field_value'
		| 'scope'
		| 'status'
		| 'target_id'
		| 'updated_at'
		| 'user_id'
	> {
	created_at: UnixTimestamp
	field_path: string
	field_value: unknown
	scope: Scope
	status: Status
	target_id: string
	updated_at: UnixTimestamp
	user_id: string
}

export interface CreateProposedChangeDto
	extends Omit<
		z.infer<typeof CreateProposedChangeSchema>,
		'created_at'
		| 'field_path'
		| 'field_value'
		| 'scope'
		| 'status'
		| 'target_id'
		| 'updated_at'
		| 'user_id'
	> {
	created_at: UnixTimestamp
	field_path: string
	field_value: unknown
	scope: Scope
	status: Status
	target_id: string
	updated_at: UnixTimestamp
	user_id: string
}

export type UpdateProposedChangeDto = Partial<Omit<CreateProposedChangeDto, 'created_by'>>;
