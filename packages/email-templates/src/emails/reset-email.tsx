/* * */

import {
	Body,
	Button,
	Container,
	Head,
	Hr,
	Html,
	Img,
	Preview,
	Section,
	Text,
} from '@react-email/components';
import React from 'react';

/* * */

interface ResetPasswordEmailProps { first_name: string, password_reset_link: string }

export function ResetPasswordEmail({ first_name, password_reset_link }: ResetPasswordEmailProps) {
	return (
		<Html>
			<Head />
			<Body style={main}>
				<Preview>Redefinição da sua palavra-passe</Preview>
				<Container style={container}>
					<Img alt="TML Logo" src="/static/tml-logo.png" width="220px" />
					<Section>
						<Text style={text}>
							👋 Olá
							{' '}
							{first_name}
							,
						</Text>
						<Text style={text}>
							Recebemos um pedido para redefinir a palavra-passe associada à sua conta. Para iniciar o processo de redefinição, clique no botão abaixo:
						</Text>
						<Button href={password_reset_link} style={button}>
							Redefinir palavra-passe
						</Button>
						<Hr />
						<Text style={text}>
							<b>Atenção:</b>
							<br />
							Se não foi você que fez este pedido, pode ignorar este e-mail. A sua palavra-passe atual continuará válida.
						</Text>
						<Text style={text}>
							<u>Este link é válido por 1 hora.</u>
						</Text>
						<Text style={text}>
							Para manter a sua conta segura, por favor não encaminhe esta mensagem
							a ninguém.
						</Text>
						<Text style={text}>Obrigado!</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

ResetPasswordEmail.PreviewProps = { first_name: 'Josué', password_reset_link: 'https://www.tmlmobilidade.pt' } as ResetPasswordEmailProps;

export default ResetPasswordEmail;

/* STYLES */

const main = {
	backgroundColor: '#f6f9fc',
	padding: '10px 0',
};

const container = {
	backgroundColor: '#ffffff',
	border: '1px solid #f0f0f0',
	padding: '45px',
};

const text = {
	color: '#404040',
	fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
	fontSize: '16px',
	fontWeight: '300',
	lineHeight: '26px',
};

const button = {
	backgroundColor: '#ffdc00',
	borderRadius: '4px',
	boxShadow: '2px 2px 3px 0px rgba(0, 0, 0, 0.1)',
	color: '#000',
	display: 'block',
	fontFamily: '\'Open Sans\', \'Helvetica Neue\', Arial',
	fontSize: '15px',
	padding: '14px 7px',
	textAlign: 'center' as const,
	textDecoration: 'none',
	width: '210px',
};
