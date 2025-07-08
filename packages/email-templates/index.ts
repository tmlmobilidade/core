/* * */

import { emailProvider } from '@/email.provider';

import { ResetPasswordEmailProps } from './src/emails/reset-email';
import { WelcomeEmailProps } from './src/emails/welcome';
import { RenderResetPasswordEmail, RenderWelcomeEmail } from './src/renderer';

/* * */

export type { ResetPasswordEmailProps };

/* * */

export interface SendEmailProps<T> {
	props: T
	to: string
}

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
