import { i18n } from '@/lib/i18n';
import { loader } from 'fumadocs-core/source';

import { docs } from '../../.source';

export const source = loader({
	baseUrl: '/',
	i18n,
	source: docs.toFumadocsSource(),
});
