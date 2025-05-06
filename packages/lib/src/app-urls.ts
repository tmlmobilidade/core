/* * */

import { type Environment, getCurrentEnvironment } from '@/environment.js';

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
 * @param environment The environment to get the URL for. If not provided, it will use the ENVIRONMENT environment variable.
 * @returns The base URL for the given app and environment
 */
export function getAppBaseUrl(app: keyof typeof APP_BASE_URLS, environment?: Environment): string {
	// Get the desired app object
	const appUrl = APP_BASE_URLS[app];
	if (!appUrl) throw new Error(`App URL for ${app} not found`);
	// Extract the current app environment either from the parameter
	// or automatically from the set environment variable.
	const currentEnvironment = environment || getCurrentEnvironment();
	// Get the base URL for the current environment
	const baseUrl = appUrl[currentEnvironment as keyof typeof appUrl];
	if (!baseUrl) throw new Error(`URL for ${currentEnvironment} environment not found`);
	// Return the URL
	return baseUrl;
}
