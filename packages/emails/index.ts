/* * */

import { emailProvider } from '@/email.provider.js';
import { FailedBackupEmailProps } from '@/emails/failed-backup.js';
import { ResetPasswordEmailProps } from '@/emails/reset-password.js';
import { SucessfulGtfsValidationEmailProps } from '@/emails/sucessful-gtfs-validation.js';
import { UnsuccessfulGtfsValidationEmailProps } from '@/emails/unsucessful-gtfs-validation.js';
import { WelcomeEmailProps } from '@/emails/welcome.js';
import { RenderFailedBackupEmail, RenderResetPasswordEmail, RenderSucessfulGtfsValidationEmail, RenderUnsuccessfulGtfsValidationEmail, RenderWelcomeEmail } from '@/renderer.js';

/* * */

export type {
	FailedBackupEmailProps,
	ResetPasswordEmailProps,
	SucessfulGtfsValidationEmailProps,
	UnsuccessfulGtfsValidationEmailProps,
	WelcomeEmailProps,
};

export * from '@/renderer.js';

/* * */

export interface SendEmailProps<T> {
	props: T
	to: string | string[]
}

export async function sendFailedBackupEmail(props: SendEmailProps<FailedBackupEmailProps>) {
	const emailHtml = await RenderFailedBackupEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Falha na execução do backup',
		to: props.to,
	});
};

export async function sendResetPasswordEmail(props: SendEmailProps<ResetPasswordEmailProps>) {
	const emailHtml = await RenderResetPasswordEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Redefinição da sua palavra-passe',
		to: props.to,
	});
};

export async function sendWelcomeEmail(props: SendEmailProps<WelcomeEmailProps>) {
	const emailHtml = await RenderWelcomeEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Bem-vindo ao GO!',
		to: props.to,
	});
};

export async function sendGtfsValidationEmail(props: SendEmailProps<SucessfulGtfsValidationEmailProps | UnsuccessfulGtfsValidationEmailProps>) {
	if (!props.props.validation.summary) throw new Error('Validation summary is required');
	const success = props.props.validation.summary.total_errors === 0;

	const emailHtml = success ? await RenderSucessfulGtfsValidationEmail(props.props) : await RenderUnsuccessfulGtfsValidationEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: success ? 'Validação GTFS realizada com sucesso' : 'Validação GTFS com erros',
		to: props.to,
	});
};
