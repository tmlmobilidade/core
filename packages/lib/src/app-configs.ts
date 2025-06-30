/* * */

import { type Environment, getCurrentEnvironment } from '@tmlmobilidade/types';

/* * */

interface AppConfigGroup {
	api_port: number
	api_url: string
	frontend_port: number
	frontend_url: string
}

/* * */

const APP_CONFIGS: Record<string, Record<Environment, AppConfigGroup>> = {

	alerts: {
		development: {
			api_port: 52001,
			api_url: 'http://localhost:52001',
			frontend_port: 51001,
			frontend_url: 'http://localhost:51001',
		},
		production: {
			api_port: 5050,
			api_url: 'https://alerts.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://alerts.sae.carrismetropolitana.pt',
		},
		staging: {
			api_port: 5050,
			api_url: 'https://staging.alerts.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://staging.alerts.sae.carrismetropolitana.pt',
		},
	},

	auth: {
		development: {
			api_port: 52000,
			api_url: 'http://localhost:52000',
			frontend_port: 51000,
			frontend_url: 'http://localhost:51000',
		},
		production: {
			api_port: 5050,
			api_url: 'https://auth.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://auth.sae.carrismetropolitana.pt',
		},
		staging: {
			api_port: 5050,
			api_url: 'https://staging.auth.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://staging.auth.sae.carrismetropolitana.pt',
		},
	},

	plans: {
		development: {
			api_port: 52004,
			api_url: 'http://localhost:52004',
			frontend_port: 51004,
			frontend_url: 'http://localhost:51004',
		},
		production: {
			api_port: 5050,
			api_url: 'https://plans.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://plans.sae.carrismetropolitana.pt',
		},
		staging: {
			api_port: 5050,
			api_url: 'https://staging.plans.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://staging.plans.sae.carrismetropolitana.pt',
		},
	},

	rides: {
		development: {
			api_port: 52002,
			api_url: 'http://localhost:52002',
			frontend_port: 51002,
			frontend_url: 'http://localhost:51002',
		},
		production: {
			api_port: 5050,
			api_url: 'https://rides.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://rides.sae.carrismetropolitana.pt',
		},
		staging: {
			api_port: 5050,
			api_url: 'https://staging.rides.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://staging.rides.sae.carrismetropolitana.pt',
		},
	},

	stops: {
		development: {
			api_port: 52003,
			api_url: 'http://localhost:52003',
			frontend_port: 51003,
			frontend_url: 'http://localhost:51003',
		},
		production: {
			api_port: 5050,
			api_url: 'https://stops.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://stops.sae.carrismetropolitana.pt',
		},
		staging: {
			api_port: 5050,
			api_url: 'https://staging.stops.sae.carrismetropolitana.pt/api',
			frontend_port: 3000,
			frontend_url: 'https://staging.stops.sae.carrismetropolitana.pt',
		},
	},

} as const;

/* * */

/**
 * Retrieves the value of a specific property from the app configuration for a given app and environment.
 * @param app The app ID.
 * @param property The property of the app configuration to retrieve (e.g., 'api_url', 'frontend_url').
 * @param environment The environment to get the property for. If not provided, it will use the ENVIRONMENT environment variable.
 * @returns The value of the specified property for the given app and environment.
 */
export function getAppConfig<App extends keyof typeof APP_CONFIGS, Prop extends keyof AppConfigGroup>(app: App, property: Prop, environment?: Environment): AppConfigGroup[Prop] {
	// Get the desired app object
	const appObject = APP_CONFIGS[app];
	if (!appObject) throw new Error(`[@core/lib] App Config Object for "${app}" app not found. Available apps: ${Object.keys(APP_CONFIGS).join(', ')}`);
	// Extract the current app environment either from the parameter
	// or automatically from the set environment variable.
	const currentEnvironment = environment || getCurrentEnvironment();
	// Get the config group for the current environment
	const configGroupForEnvironment = appObject[currentEnvironment];
	if (!configGroupForEnvironment) throw new Error(`[@core/lib] AppConfig group for app "${app}" in environment "${currentEnvironment}" environment not found. Available environments: ${Object.keys(appObject).join(', ')}`);
	// Get the property value from the config group
	const propertyValue = configGroupForEnvironment[property];
	if (propertyValue === undefined) throw new Error(`[@core/lib] Property "${property}" for app "${app}" in environment "${currentEnvironment}" not found. Available properties: ${Object.keys(configGroupForEnvironment).join(', ')}`);
	// Return the value
	return propertyValue;
}
