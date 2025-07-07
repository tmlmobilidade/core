/* * */

import { emailProvider } from '@tmlmobilidade/interfaces';

import { RenderResetPasswordEmail } from './src/renderer';

/* * */

interface SendEmailProps<T> {
	props: T
	to: string
}

export function sendResetPasswordEmail(props: SendEmailProps<Parameters<typeof RenderResetPasswordEmail>[0]>) {
	const emailHtml = RenderResetPasswordEmail(props.props);
	emailProvider.send({
		html: emailHtml,
		subject: 'Redefinição da sua palavra-passe',
		to: props.to,
	});
};
