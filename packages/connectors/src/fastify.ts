/* * */

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify, { type FastifyInstance, type FastifyServerOptions } from 'fastify';

/**
 * FastifyServiceOptions interface defines the options for the Fastify server.
 * It extends FastifyServerOptions and adds optional properties for origin and port.
 */
export interface FastifyServiceOptions extends FastifyServerOptions {

	/**
	 * The origin for CORS requests.
	 * Defaults to '*' if not provided.
	 * @default '*'
	 * @example 'https://example.com'
	 */
	origin?: string

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

	private readonly origin: string;

	private readonly port: number;

	/**
	 * Creates an instance of FastifyService.
	 * @param options The options for the Fastify server.
	 */
	private constructor(options: FastifyServiceOptions) {
		this.server = fastify(options);
		this.origin = options.origin || '';
		this.port = options.port || 5050;
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
	 * @return A promise that resolves when the server is started.
	 */
	async start() {
		try {
			await this.server.listen({ port: this.port });
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
		await this.server.register(cors, { credentials: true, origin: this.origin });
		await this.server.register(cookie);
	}

	//
}
