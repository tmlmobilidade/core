/* * */

import { EmailWrapper, styles, ValidationSummary } from '@/components/index.js';
import { Button, Hr, Section, Text } from '@react-email/components';
import { getAppConfig } from '@tmlmobilidade/lib';
import { ProcessingStatus, UnixTimestamp, Validation } from '@tmlmobilidade/types';

/* * */

export interface SucessfulGtfsValidationEmailProps {
	first_name: string
	validation: Validation
}

export function SucessfulGtfsValidationEmail({ first_name, validation }: SucessfulGtfsValidationEmailProps) {
	const go_link = getAppConfig('plans', 'frontend_url') + '/validations/' + validation._id;

	const totalWarnings = validation.summary?.total_warnings ?? 0;
	const hasData = validation.summary !== null && validation.summary !== undefined;

	return (
		<EmailWrapper preview="Validação GTFS realizada com sucesso">
			<Section>
				<Text style={styles.text}>
					👋 Olá
					{' '}
					{first_name}
					,
				</Text>

				<Text style={styles.text}>
					Excelentes notícias! A validação GTFS do seu arquivo foi concluída com sucesso.
				</Text>

				<Hr style={{ margin: '24px 0' }} />

				<ValidationSummary hasData={hasData} isSuccessful totalErrors={0} totalWarnings={totalWarnings} />

				<Hr style={{ margin: '24px 0' }} />

				<Text style={styles.text}>
					<strong>O que isto significa:</strong>
				</Text>

				<Text style={styles.text}>
					• O seu arquivo GTFS está estruturalmente correto
					<br />
					• Os dados podem ser utilizados pelos sistemas de informação ao passageiro
					<br />
					• O arquivo está pronto para publicação
					{totalWarnings > 0 ? ' (considere resolver os avisos)' : ''}
				</Text>

				{totalWarnings > 0 && (
					<Text style={styles.textStyles.warning}>
						💡 Nota: Os avisos encontrados não impedem o funcionamento do sistema, mas a sua correção pode melhorar a qualidade dos dados.
					</Text>
				)}

				<Text style={styles.text}>
					Para ver os detalhes completos da validação
					{totalWarnings > 0 ? ' e verificar os avisos' : ''}
					, clique no botão abaixo:
				</Text>

				<Button href={go_link} style={styles.button}>
					Ver Relatório Completo
				</Button>

				<Hr style={{ margin: '24px 0' }} />

				<Text style={styles.textStyles.muted}>
					Parabéns pelo trabalho! Se tiver dúvidas sobre algum aspecto da validação, a nossa equipa de suporte está disponível para ajudar.
				</Text>
			</Section>
		</EmailWrapper>
	);
};

const validation: Validation = {
	_id: '123',
	created_at: 1715328000 as UnixTimestamp,
	feeder_status: 'success' as ProcessingStatus,
	file_id: '123',
	gtfs_agency: {
		agency_id: '123',
		agency_name: 'Test Agency',
		agency_timezone: 'Europe/Lisbon',
	},
	gtfs_feed_info: {
		feed_lang: 'en',
	},
	summary: {
		messages: [],
		total_errors: 0,
		total_warnings: 3,
	},
	updated_at: 1715328000 as UnixTimestamp,
};

SucessfulGtfsValidationEmail.PreviewProps = {
	first_name: 'Josué',
	validation,
} as SucessfulGtfsValidationEmailProps;

export default SucessfulGtfsValidationEmail;
