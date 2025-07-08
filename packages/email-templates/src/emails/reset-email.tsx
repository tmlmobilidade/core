/* * */

import EmailWrapper from '@/components/email-wrapper';
import styles from '@/components/styles';
import { Button, Hr, Section, Text } from '@react-email/components';

/* * */

export interface ResetPasswordEmailProps { first_name: string, password_reset_link: string }

export function ResetPasswordEmail({ first_name, password_reset_link }: ResetPasswordEmailProps) {
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
					Recebemos um pedido para redefinir a palavra-passe associada à sua conta. Para iniciar o processo de redefinição, clique no botão abaixo:
				</Text>
				<Button href={password_reset_link} style={styles.button}>
					Redefinir palavra-passe
				</Button>
				<Hr />
				<Text style={styles.text}>
					<b>Atenção:</b>
					<br />
					Se não foi você que fez este pedido, pode ignorar este e-mail. A sua palavra-passe atual continuará válida.
				</Text>
				<Text style={styles.text}>
					<u>Este link é válido por 1 hora.</u>
				</Text>
				<Text style={styles.text}>
					Para manter a sua conta segura, por favor não encaminhe esta mensagem
					a ninguém.
				</Text>
				<Text style={styles.text}>Obrigado!</Text>
			</Section>
		</EmailWrapper>
	);
};

ResetPasswordEmail.PreviewProps = { first_name: 'Josué', password_reset_link: 'https://www.tmlmobilidade.pt' } as ResetPasswordEmailProps;

export default ResetPasswordEmail;
