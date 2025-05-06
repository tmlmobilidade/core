/* * */

/**
 * This file contains the list of URLs
 * for each application for each environment.
 */
export const APP_BASE_URLS = Object.freeze({

	alerts: {
		development: 'http://localhost:51001',
		production: 'https://alerts.sae.carrismetropolitana.pt',
		staging: 'https://staging.alerts.sae.carrismetropolitana.pt',
	},

	auth: {
		development: 'http://localhost:51000',
		production: 'https://auth.sae.carrismetropolitana.pt',
		staging: 'https://auth.sae.carrismetropolitana.pt',
	},

	controller: {
		development: 'http://localhost:51002',
		production: 'https://controller.sae.carrismetropolitana.pt',
		staging: 'https://staging.controller.sae.carrismetropolitana.pt',
	},

	equipments: {
		development: 'http://localhost:51005',
		production: 'https://equipments.sae.carrismetropolitana.pt',
		staging: 'https://staging.equipments.sae.carrismetropolitana.pt',
	},

	plans: {
		development: 'http://localhost:51004',
		production: 'https://plans.sae.carrismetropolitana.pt',
		staging: 'https://staging.plans.sae.carrismetropolitana.pt',
	},

	stops: {
		development: 'http://localhost:51003',
		production: 'https://stops.sae.carrismetropolitana.pt',
		staging: 'https://staging.stops.sae.carrismetropolitana.pt',
	},

});

/**
 * Get the URL for a given app and environment.
 * @param app The app ID
 * @param environment The environment to get the URL for
 * @returns The base URL for the given app and environment
 */
export function getAppBaseUrl(app: keyof typeof APP_BASE_URLS, environment = 'development'): string {
	// Get the desired app object
	const appUrl = APP_BASE_URLS[app];
	if (!appUrl) throw new Error(`App URL for ${app} not found`);
	// Get the desired environment value
	const url = appUrl[environment as keyof typeof appUrl];
	if (!url) throw new Error(`URL for ${environment} environment not found`);
	// Return the URL
	return url;
}
