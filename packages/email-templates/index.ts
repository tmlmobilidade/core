/* * */

import { emailProvider } from '@/email.provider';
import { SucessfulGtfsValidationEmailProps } from '@/emails/sucessful-gtfs-validation';
import { UnsuccessfulGtfsValidationEmailProps } from '@/emails/unsucessful-gtfs-validation';

import { FailedBackupEmailProps } from './src/emails/failed-backup';
import { ResetPasswordEmailProps } from './src/emails/reset-password';
import { WelcomeEmailProps } from './src/emails/welcome';
import { RenderFailedBackupEmail, RenderResetPasswordEmail, RenderSucessfulGtfsValidationEmail, RenderUnsuccessfulGtfsValidationEmail, RenderWelcomeEmail } from './src/renderer';

/* * */

export type { FailedBackupEmailProps };
export type { ResetPasswordEmailProps };

/* * */

export interface SendEmailProps<T> {
	props: T
	to: string
}

export async function sendFailedBackupEmail(props: SendEmailProps<FailedBackupEmailProps>) {
	const emailHtml = RenderFailedBackupEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Falha na execução do backup',
		to: props.to,
	});
};

export async function sendResetPasswordEmail(props: SendEmailProps<ResetPasswordEmailProps>) {
	const emailHtml = RenderResetPasswordEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Redefinição da sua palavra-passe',
		to: props.to,
	});
};

export async function sendWelcomeEmail(props: SendEmailProps<WelcomeEmailProps>) {
	const emailHtml = RenderWelcomeEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: 'Bem-vindo ao GO!',
		to: props.to,
	});
};

export async function sendGtfsValidationEmail(props: SendEmailProps<SucessfulGtfsValidationEmailProps | UnsuccessfulGtfsValidationEmailProps>) {
	if (!props.props.validation.summary) throw new Error('Validation summary is required');
	const success = props.props.validation.summary.total_errors === 0;

	const emailHtml = success ? RenderSucessfulGtfsValidationEmail(props.props) : RenderUnsuccessfulGtfsValidationEmail(props.props);
	await emailProvider.send({
		html: emailHtml,
		subject: success ? 'Validação GTFS realizada com sucesso' : 'Validação GTFS com erros',
		to: props.to,
	});
};
