/* * */

/**
 * Common types used across the system.
 * This type should be used to represent the processing status
 * of various operations. It can be used in APIs, database operations,
 * or any other context where a processing status needs to be communicated.
 */
export enum ProcessingStatus {
	Complete = 'complete',
	Error = 'error',
	Processing = 'processing',
	Waiting = 'waiting',
}
