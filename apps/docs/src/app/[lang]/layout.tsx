import { I18nProvider, type Translations } from 'fumadocs-ui/i18n';
// import { RootProvider } from 'fumadocs-ui/provider';

const pt: Partial<Translations> = {
	chooseLanguage: 'Escolher idioma',
	chooseTheme: 'Escolher tema',
	editOnGithub: 'Editar no GitHub',
	lastUpdate: 'Última atualização',
	nextPage: 'Próxima página',
	previousPage: 'Página anterior',
	search: 'Pesquisar',
	searchNoResult: 'Nenhum resultado encontrado',
	toc: 'Índice',
	tocNoHeadings: 'Nenhum tópico encontrado',
};

// available languages that will be displayed on UI
// make sure `locale` is consistent with your i18n config
const locales = [
	{
		locale: 'en',
		name: 'English',
	},
	{
		locale: 'pt',
		name: 'Português',
	},
];

export default async function RootLayout({
	children,
	params,
}: {
	children: React.ReactNode
	params: Promise<{ lang: string }>
}) {
	const lang = (await params).lang;

	return (
		<I18nProvider
			locale={lang}
			locales={locales}
			translations={{ pt }[lang]}
		>
			{children}
		</I18nProvider>
	);
}
