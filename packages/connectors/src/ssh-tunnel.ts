import type { AddressInfo, Server } from 'net';
import type { ForwardOptions, ServerOptions, SshOptions, TunnelOptions } from 'tunnel-ssh';

import { createTunnel } from 'tunnel-ssh';

export interface SshConfig {
	forwardOptions: ForwardOptions
	serverOptions: ServerOptions
	sshOptions: SshOptions
	tunnelOptions: TunnelOptions
}

export interface SshTunnelConnectorOptions {
	maxRetries?: number
}

export class SshTunnelConnector {
	private static _instance: SshTunnelConnector;
	get server(): Server | undefined {
		return this._server;
	}

	private _server: Server;
	private config: SshConfig;
	private options: SshTunnelConnectorOptions;

	private retries = 0;

	constructor(config: SshConfig, options: SshTunnelConnectorOptions = {}) {
		this.config = config;
		this.options = options;
	}

	/**
     * Get the singleton instance of SshTunnelConnector.
     */
	public static getInstance(config?: SshConfig, options?: SshTunnelConnectorOptions): SshTunnelConnector {
		if (!SshTunnelConnector._instance) {
			if (!config) {
				throw new Error('SSH Config is required');
			}

			SshTunnelConnector._instance = new SshTunnelConnector(config, options);
		}

		return SshTunnelConnector._instance;
	}

	/**
     * Establishes an SSH tunnel connection using the provided configuration options.
     *
     * @throws {Error} Throws an error if the connection fails after the maximum number of retries.
     *
     * @remarks
     * - The method attempts to create an SSH tunnel using the `createTunnel` function with the specified options.
     * - If the connection is successful, it logs the connected host port and sets up an error listener on the server.
     * - If the connection fails, it retries the connection up to a maximum number of retries specified in the options.
     *
     * @example
     * ```typescript
     * const sshTunnelConnector = new SshTunnelConnector(config);
     * sshTunnelConnector.connect();
     * ```
     */
	async connect() {
		try {
			const [server] = await createTunnel(this.config.tunnelOptions, this.config.serverOptions, this.config.sshOptions, this.config.forwardOptions);
			console.log(`⤷ SSH Tunnel connected to host port ${(server.address() as AddressInfo).port}`);

			this._server = server;

			server.on('error', (error) => {
				console.log(`⤷ SSH Tunnel Error:`, error);
			});

			server.on('close', () => {
				console.log(`⤷ SSH Tunnel closed.`);
			});
		}
		catch (error) {
			if (error.code === 'EADDRINUSE') {
				console.log(`⤷ ERROR: Port "${this.config.serverOptions.port}" already in use. Retrying with a different port...`);
				this.config.serverOptions.port = (this.config.serverOptions.port ?? 0) + 1;
				return;
			}

			console.log(`⤷ ERROR: Failed to connect to SSH Tunnel.`, error);
			if (this.retries < (this.options?.maxRetries || 3)) {
				this.retries++;
				console.log(`⤷ Retrying SSH connection...`);
				this.connect();
			}
			else {
				throw new Error('Error connecting to SSH tunnel', error);
			}
		}
	}

	/**
     * Disconnects the SSH tunnel by closing the server.
     *
     * @returns {Promise<void>} A promise that resolves when the server is successfully closed.
     * @throws Will log an error message if the server fails to close.
     */
	async disconnect() {
		try {
			this._server.close();
			console.log(`⤷ SSH Tunnel disconnected.`);
		}
		catch (error) {
			console.log(`⤷ ERROR: Failed to disconnect from SSH Tunnel.`, error);
		}
	}

	/**
     * Reconnects the SSH tunnel by first disconnecting and then connecting again.
     * This method ensures that the connection is reset.
     *
     * @returns {Promise<void>} A promise that resolves when the reconnection process is complete.
     */
	async reconnect() {
		await this.disconnect();
		this.connect();
	}
}
