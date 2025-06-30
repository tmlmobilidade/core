/* * */

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import fastify, { FastifyInstance, FastifyListenOptions, FastifyServerOptions } from 'fastify';

/* * */

export interface ExtendedFastifyServiceOptions extends FastifyServerOptions {
	origin?: string
}

/* * */

export class FastifyService {
	private static _instance: FastifyService;
	public readonly server: FastifyInstance;
	private readonly origin: string;

	private constructor(options: ExtendedFastifyServiceOptions) {
		this.server = fastify(options);
		this.origin = options.origin || '*';
		this._setupDefaultRoutes();
		this._setupPlugins();
	}

	public static getInstance(options?: FastifyServerOptions) {
		if (!FastifyService._instance) {
			FastifyService._instance = new FastifyService(options || {});
		}

		return FastifyService._instance;
	}

	async start() {
		const options: FastifyListenOptions = {
			host: process.env.HOST || '0.0.0.0',
			port: Number(process.env.API_PORT) || 5050,
		};

		try {
			await this.server.listen(options);
		}
		catch (error) {
			this.server.log.error({
				error,
				message: 'Error starting server',
			});
			process.exit(1);
		}
	}

	async stop() {
		try {
			await this.server.close();
		}
		catch (error) {
			this.server.log.error(error);
			process.exit(1);
		}
	}

	private _setupDefaultRoutes() {
		this.server.get('/', (req, res) => {
			res.send('Jusi was here!');
		});
	}

	private async _setupPlugins() {
		await this.server.register(cors, {
			credentials: true,
			origin: this.origin,
		});
		await this.server.register(cookie);
	}
}
