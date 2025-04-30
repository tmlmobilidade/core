import nodemailer, { Transporter } from 'nodemailer';

export interface MailOptions {
	from: string
	html?: string
	subject: string
	text?: string
	to: string | string[]
}

export interface SmtpConfig {
	auth: {
		pass: string
		user: string
	}
	host: string
	port: number
}

export interface EmailConfig {
	mail_options: Omit<MailOptions, 'html' | 'text'>
	send_failure: boolean
	send_success: boolean
	smtp: SmtpConfig
}

export class MailerService {
	private transporter: Transporter;

	constructor(private config: EmailConfig) {
		this.transporter = nodemailer.createTransport(this.config.smtp);
	}

	private async sendMail(mail_options: MailOptions): Promise<void> {
		try {
			const info = await this.transporter.sendMail(mail_options);
			console.log(`Email sent: ${info.messageId}`);
		}
		catch (error) {
			console.error('Error sending email:', error);
		}
	}

	public async sendFailureMail(): Promise<void> {
		this.config.mail_options.subject = 'Backup failed';

		const mail_options = {
			...this.config.mail_options,
			html: '<p>Backup failed</p>',
			subject: `${this.config.mail_options.subject}: Backup failed`,
		};

		await this.sendMail(mail_options);
	}

	public async sendSuccessMail(): Promise<void> {
		this.config.mail_options.subject = 'Backup successful';

		const mail_options = {
			...this.config.mail_options,
			subject: `${this.config.mail_options.subject}: Backup successful`,
			text: 'Backup was successful',
		};

		await this.sendMail(mail_options);
	}
}
