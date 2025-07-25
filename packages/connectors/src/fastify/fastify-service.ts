/* * */

import '@fastify/cookie';
import '@fastify/cors';

/* * */

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import { HttpResponse, WithPagination } from '@tmlmobilidade/utils';

/* * */

import fastify from 'fastify';
import { type FastifyInstance as FastifyInstanceType, type FastifyReply as FastifyReplyType, type FastifyRequest as FastifyRequestType } from 'fastify';
import { type ContextConfigDefault, type FastifyBaseLogger, type FastifySchema, type FastifyServerOptions, type FastifyTypeProviderDefault, type RawReplyDefaultExpression, type RawRequestDefaultExpression, type RawServerBase, type RawServerDefault, type RouteGenericInterface } from 'fastify';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FastifyRequest = FastifyRequestType<any>;
export type FastifyReply<T> = FastifyReplyType<RouteGenericInterface & { Reply: HttpResponse<T> | WithPagination<HttpResponse<T>> }, RawServerBase, RawRequestDefaultExpression<RawServerBase>, RawReplyDefaultExpression<RawServerBase>, ContextConfigDefault, FastifySchema, FastifyTypeProviderDefault, HttpResponse<T> | WithPagination<HttpResponse<T>>>;
export type FastifyResponse<T> = FastifyReplyType<RouteGenericInterface & { Reply: HttpResponse<T> | WithPagination<HttpResponse<T>> }, RawServerBase, RawRequestDefaultExpression<RawServerBase>, RawReplyDefaultExpression<RawServerBase>, ContextConfigDefault, FastifySchema, FastifyTypeProviderDefault, HttpResponse<T> | WithPagination<HttpResponse<T>>>;
export type FastifyInstance = FastifyInstanceType<RawServerDefault, RawRequestDefaultExpression, RawReplyDefaultExpression, FastifyBaseLogger, FastifyTypeProviderDefault>;

/**
 * FastifyServiceOptions interface defines the options for the Fastify server.
 * It extends FastifyServerOptions and adds optional properties for origin and port.
 */
export interface FastifyServiceOptions extends FastifyServerOptions {

	/**
	 * The host on which the Fastify server will listen.
	 * If not provided, it defaults to '0.0.0.0'.
	 * @default '0.0.0.0'
	 */
	host?: string

	/**
	 * The origin for CORS requests.
	 * Defaults to `true` if not provided.
	 * @default true
	 * @example 'https://example.com'
	 */
	origin?: RegExp | string | true

	/**
	 * The port on which the Fastify server will listen.
	 * If not provided, it defaults to 5050.
	 * @default 5050
	 */
	port?: number

}

/**
 * FastifyService is a singleton class that provides a Fastify server instance.
 * It allows for setting up routes, plugins, and starting/stopping the server.
 * This class is designed to be used as a service in a Node.js application.
 * It uses the Fastify framework for building web applications and APIs.
 */
export class FastifyService {
	//

	private static _instance: FastifyService;

	public readonly server: FastifyInstance;
	private readonly host: FastifyServiceOptions['host'];
	private readonly origin: FastifyServiceOptions['origin'];
	private readonly port: FastifyServiceOptions['port'];

	/**
	 * Creates an instance of FastifyService.
	 * @param options The options for the Fastify server.
	 */
	private constructor(options: FastifyServiceOptions) {
		this.server = fastify(options);
		this.origin = options.origin ?? true;
		this.port = options.port ?? 5050;
		this.host = options.host ?? '0.0.0.0';
		this._setupDefaultRoutes();
		this._setupPlugins();
	}

	/**
	 * Gets the singleton instance of FastifyService.
	 * @param options The options for the Fastify server.
	 * @return The singleton instance of FastifyService.
	 */
	public static getInstance(options?: FastifyServiceOptions) {
		if (!FastifyService._instance) {
			// Create a new instance if it doesn't exist yet
			FastifyService._instance = new FastifyService(options || {});
		}
		// Return the existing instance
		return FastifyService._instance;
	}

	/**
	 * Starts the Fastify server.
	 * @return A promise that resolves to the URL of the Fastify server.
	 * @throws Will throw an error if the server fails to start.
	 */
	async start(): Promise<string> {
		try {
			const serverUrl = await this.server.listen({ host: this.host, port: this.port });
			this.server.log.info(`Server is running at ${serverUrl}`);
			this.server.log.info(`CORS enabled for origin: ${this.origin}`);
			this.server.log.info(`Listening on ${this.host}:${this.port}`);
			return serverUrl;
		}
		catch (error) {
			this.server.log.error({ error, message: 'Error starting server.' });
			process.exit(1);
		}
	}

	/**
	 * Stops the Fastify server.
	 * @return A promise that resolves when the server is stopped.
	 */
	async stop() {
		try {
			await this.server.close();
			console.log('Fastify server stopped.');
		}
		catch (error) {
			this.server.log.error(error);
			process.exit(1);
		}
	}

	/**
	 * Sets the URL of the Fastify server.
	 * @return The URL of the Fastify server.
	 */
	private _setupDefaultRoutes() {
		this.server.get('/', (req, res) => {
			res.send('Jusi was here!');
		});
	}

	/**
	 * Sets up the plugins for the Fastify server.
	 * @return A promise that resolves when the plugins are set up.
	 */
	private async _setupPlugins() {
		//

		await this.server.register(cors, {
			credentials: true,
			origin: this.origin,
		});
		await this.server.register(cookie);
	}

	//
}
