/* * */

import { EmailWrapper, InfoBox, styles } from '@/components/index.js';
import { Button, Hr, Section, Text } from '@react-email/components';
import { getAppConfig } from '@tmlmobilidade/lib';
import { type UnixTimestamp } from '@tmlmobilidade/types';
import { Dates } from '@tmlmobilidade/utils';

/* * */

export interface NotificationEmailProps {
	action: string
	creation_date: UnixTimestamp
	description: string
	title: string
}

export function NotificationEmail({ action, creation_date, description, title }: NotificationEmailProps) {
	const url = getAppConfig('plans', 'frontend_url') + '/validations/';

	return (
		<EmailWrapper preview="Pedido de aprovação de plano">
			<Section>
				<Text style={styles.text}>
					👋 Olá,
				</Text>

				<Text style={styles.text}>
					Tens uma nova notificação
				</Text>

				<Hr style={{ margin: '24px 0' }} />

				<InfoBox variant="info">
					<Text style={{ ...styles.text, margin: '0 0 12px 0' }}>
						<strong>📋 Detalhes da Notificação</strong>
					</Text>

					<Text style={{ ...styles.text, margin: '8px 0' }}>
						<strong>Titulo</strong>
						{' '}
						{title}
						<br />
						<strong>Descrição</strong>
						{description}
						<br />
						<strong>Data de Criação:</strong>
						{' '}
						{Dates.fromUnixTimestamp(creation_date).setZone('Europe/Lisbon', 'offset_only').toLocaleString(Dates.FORMATS.DATETIME_SHORT, 'pt-PT')}
					</Text>
				</InfoBox>

				<Button href={url} style={styles.button}>
					Ver Notificação
				</Button>

			</Section>
		</EmailWrapper>
	);
};

export default NotificationEmail;
