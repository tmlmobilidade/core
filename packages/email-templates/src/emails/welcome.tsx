/* * */

import EmailWrapper from '@/components/email-wrapper';
import styles from '@/components/styles';
import { Button, Link, Section, Text } from '@react-email/components';
import { getAppConfig } from '@tmlmobilidade/lib';

/* * */

export interface WelcomeEmailProps { first_name: string, setup_password_link: string }

export function WelcomeEmail({ first_name, setup_password_link }: WelcomeEmailProps) {
	const go_link = getAppConfig('auth', 'frontend_url', 'production');

	return (
		<EmailWrapper preview="Redefinição da sua palavra-passe">
			<Section>
				<Text style={styles.text}>
					👋 Olá
					{' '}
					{first_name}
					,
				</Text>
				<Text style={styles.text}>
					Bem-vindo ao
					{' '}
					<b>GO</b>
					{' '}
					(Gestor de Oferta) da Transportes Metropolitanos de Lisboa!
				</Text>
				<Text style={styles.text}>
					Para começar a usar o
					{' '}
					<b>GO</b>
					, por favor, defina uma palavra-passe para a sua conta.
				</Text>
				<Button href={setup_password_link} style={styles.button}>
					Definir palavra-passe
				</Button>
				<Text style={styles.text}>
					Se já tem uma conta, pode aceder ao GO em:
					{' '}
					<Link href={go_link}>GO (Gestor de Oferta)</Link>
				</Text>
			</Section>
		</EmailWrapper>
	);
};

WelcomeEmail.PreviewProps = { first_name: 'Josué', setup_password_link: 'https://www.tmlmobilidade.pt' } as WelcomeEmailProps;

export default WelcomeEmail;
