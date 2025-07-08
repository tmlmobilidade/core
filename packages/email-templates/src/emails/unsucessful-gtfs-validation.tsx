/* * */

import { EmailWrapper, styles, ValidationSummary } from '@/components';
import { Button, Hr, Section, Text } from '@react-email/components';
import { getAppConfig } from '@tmlmobilidade/lib';
import { Validation } from '@tmlmobilidade/types';

/* * */

export interface UnsuccessfulGtfsValidationEmailProps {
	first_name: string
	validation: Validation
}

export function UnsuccessfulGtfsValidationEmail({ first_name, validation }: UnsuccessfulGtfsValidationEmailProps) {
	const go_link = getAppConfig('plans', 'frontend_url') + '/validations/' + validation._id;

	// Safe access to validation summary with fallbacks
	const totalErrors = validation.summary?.total_errors ?? 0;
	const totalWarnings = validation.summary?.total_warnings ?? 0;
	const hasData = validation.summary !== null && validation.summary !== undefined;

	return (
		<EmailWrapper preview="Validação GTFS com erros">
			<Section>
				<Text style={styles.text}>
					👋 Olá
					{' '}
					{first_name}
					,
				</Text>

				<Text style={styles.text}>
					A validação GTFS do seu arquivo foi concluída, mas foram encontrados problemas que precisam da sua atenção.
				</Text>

				<Hr style={{ margin: '24px 0' }} />

				<ValidationSummary hasData={hasData} isSuccessful={false} totalErrors={totalErrors} totalWarnings={totalWarnings} />

				<Hr style={{ margin: '24px 0' }} />

				<Text style={styles.text}>
					<strong>O que fazer agora:</strong>
				</Text>

				<Text style={styles.text}>
					• Reveja os erros e avisos na plataforma
					<br />
					• Corrija os problemas identificados no seu arquivo GTFS
					<br />
					• Faça upload do arquivo corrigido para uma nova validação
				</Text>

				{totalErrors > 0 && (
					<Text style={styles.textStyles.error}>
						⚠️ Importante: Erros críticos impedem o correto funcionamento do sistema de transportes e devem ser corrigidos antes da publicação.
					</Text>
				)}

				<Text style={styles.text}>
					Para ver os detalhes completos da validação e corrigir os problemas, clique no botão abaixo:
				</Text>

				<Button href={go_link} style={styles.button}>
					Ver Detalhes da Validação
				</Button>

				<Hr style={{ margin: '24px 0' }} />

				<Text style={styles.textStyles.muted}>
					Se precisar de ajuda para interpretar os resultados da validação ou corrigir os problemas, não hesite em contactar a nossa equipa de suporte.
				</Text>
			</Section>
		</EmailWrapper>
	);
};

UnsuccessfulGtfsValidationEmail.PreviewProps = {
	first_name: 'Josué',
	validation: {
		_id: '123',
		summary: {
			messages: [],
			total_errors: 3,
			total_warnings: 4,
		},
	},
} as UnsuccessfulGtfsValidationEmailProps;

export default UnsuccessfulGtfsValidationEmail;
