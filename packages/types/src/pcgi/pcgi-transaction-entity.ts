/* * */

export interface PCGI_TransactionEntity {
	_id: string
	cardSerialNumber: string
	createdAt: Date
	csvValue: string
	decodeValue: string
	duplicated: boolean
	fileId: string
	isBeingACK: boolean
	isDecoded: true
	isOK: boolean
	isReprocessed: boolean
	operatorLongId: string
	respondedAt: Date
	status: boolean
	transaction: string
	transactionDate: string
	transactionId: string
	transactionType: number
	updatedAt: Date
	validatedAt: Date
	verified: boolean
}
