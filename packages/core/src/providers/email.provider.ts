/* * */

import { AsyncSingletonProxy } from '@/utils/index.js';
import nodemailer from 'nodemailer';

/* * */

class EmailProvider {
	//

	private static _instance: EmailProvider;
	private _smtp_transporter: nodemailer.Transporter;

	/**
     * Return the instance of the EmailProvider.
     */
	public static async getInstance() {
		if (!EmailProvider._instance) {
			const instance = new EmailProvider();
			await instance.connect();
			EmailProvider._instance = instance;
		}
		return EmailProvider._instance;
	}

	/**
     * Connect to MongoDB and return the database instance.
     */
	async connect(): Promise<nodemailer.Transporter> {
		try {
			// Check for required environment variables
			if (!process.env.TML_PROVIDER_EMAIL_SERVER_PASSWORD) throw new Error('Missing TML_PROVIDER_EMAIL_SERVER_PASSWORD environment variable!');
			if (!process.env.TML_PROVIDER_EMAIL_SERVER_USER) throw new Error('Missing TML_PROVIDER_EMAIL_SERVER_USER environment variable!');
			if (!process.env.TML_PROVIDER_EMAIL_FROM) throw new Error('Missing TML_PROVIDER_EMAIL_FROM environment variable!');
			if (!process.env.TML_PROVIDER_EMAIL_SERVER_HOST) throw new Error('Missing TML_PROVIDER_EMAIL_SERVER_HOST environment variable!');
			if (!process.env.TML_PROVIDER_EMAIL_SERVER_PORT) throw new Error('Missing TML_PROVIDER_EMAIL_SERVER_PORT environment variable!');
			// Create the SMTP transporter
			const smtpTransportOptions = {
				auth: {
					pass: process.env.TML_PROVIDER_EMAIL_SERVER_PASSWORD,
					user: process.env.TML_PROVIDER_EMAIL_SERVER_USER,
				},
				from: process.env.TML_PROVIDER_EMAIL_FROM,
				host: process.env.TML_PROVIDER_EMAIL_SERVER_HOST,
				port: Number(process.env.TML_PROVIDER_EMAIL_SERVER_PORT),
			};
			// Connect to the SMTP server
			this._smtp_transporter = nodemailer.createTransport(smtpTransportOptions);
			return this._smtp_transporter;
		}
		catch (error) {
			throw new Error('Error connecting to SMTP server', { cause: error });
		}
	}

	/**
     * Send an email.
	 *
	 * @param emailOptions - The email options.
	 * @returns A promise that resolves when the email is sent.
     */
	async send(emailOptions: nodemailer.SendMailOptions) {
		try {
			await this._smtp_transporter.sendMail(emailOptions);
		}
		catch (error) {
			throw new Error('Error sending email', { cause: error });
		}
	}

	//
}

export const emailProvider = AsyncSingletonProxy(EmailProvider);
