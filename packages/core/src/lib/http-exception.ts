import HttpStatus from './http-status';

class HttpException extends Error {
	readonly statusCode: number;

	constructor(statusCode: number, message: string, cause?: unknown) {
		super(message);
		this.statusCode = statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
		this.message = message;
		this.cause = cause;
	}
}

export default HttpException;
